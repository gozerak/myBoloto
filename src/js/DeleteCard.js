import { useState, useEffect } from "react"
import "../css/DeleteCard.css"
import Modal from "./Modal";
import { useCheckJWT } from "../hooks/CheckJWT";

export default function DeleteCard ({cardJob_id}) {
    const [isModalOpen, setModalOpen] = useState (false);
    const isVerified = useCheckJWT();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleDeleteCard = async () => {
        if (!isVerified) {
            console.error("JWT не прошла проверку");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`http://10.14.113.150:8010/jobs/remove_job?job_id=${cardJob_id}`, { method: "DELETE" });
            console.log(cardJob_id)
            if (response.ok) {
                console.log("Запись успешно удалена");
                setModalOpen(false);
                // мб еще что-то, например рефреш страницы
            } else {
                console.error("Ошибка удаления записи");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isVerified) {
            // Логика для управления состоянием, когда JWT не прошла проверку
            console.warn("Необходимо перелогиниться");
        }
    }, [isVerified]);
    return (
        <>
        <button className="delete-card-btn" onClick={() => setModalOpen(true)}>Удалить</button>
        <Modal isOpen={isModalOpen} onClose={() =>setModalOpen(false)}>
            <p>Вы действительно хотите удалить запись?</p>
            <div className="delete-buttons">
            <button type='button' className='delete-btn-back' onClick={() => setModalOpen(false)}>Отмена</button>
            <button type='submit' className='delete-btn-submit' onClick={() => handleDeleteCard()} disabled={isLoading}>
            {isLoading? "Загрузка...": "Подтвердить"}
            </button>
            </div>
        </Modal>
        </>
    )
}