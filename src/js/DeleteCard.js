import { useState, useEffect } from "react"
import "../css/DeleteCard.css"
import Modal from "./Modal";
import { useCheckJWT } from "../hooks/CheckJWT";
import { API_BASE_URL } from "../services/apiService";

export default function DeleteCard ({cardJob_id}) {
    const [isModalOpen, setModalOpen] = useState (false);
    const isVerified = useCheckJWT();
    const [isLoading, setIsLoading] = useState(false);
    
    async function handleDeleteCard() {
        if (!isVerified) {
            console.error("JWT не прошла проверку");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/remove_job?job_id=${cardJob_id}`, { method: "DELETE"
             });
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
            window.location.reload()
        }
    };

    useEffect(() => {
        if (!isVerified) {
            // Логика для управления состоянием, когда JWT не прошла проверку
            console.warn("В DeleteCard jwt не прошел проверку");
        }
    }, [isVerified]);
    return (
        <>
        <button className="delete-card-btn" onClick={() => setModalOpen(true)}>Удалить</button>
        <Modal isOpen={isModalOpen} onClose={() =>setModalOpen(false)}>
            <div className="delete-modal">
            <p className="delete-question">Вы действительно хотите удалить запись?</p>
            <div className="delete-buttons">
            <button type='button' className='delete-btn-back' onClick={() => setModalOpen(false)}>Отмена</button>
            <button type='submit' className='delete-btn-submit' onClick={() => handleDeleteCard()} disabled={isLoading}>
            {isLoading? "Загрузка...": "Подтвердить"}
            </button>
            </div>
            </div>
        </Modal>
        </>
    )
}