import { useState } from "react"
import "../css/DeleteCard.css"
import Modal from "./Modal";
import { useCheckJWT } from "../hooks/CheckJWT";
import { API_BASE_URL } from "../services/apiService";
import TemporaryNotifier from "./TemporaryNotifier";

export default function DeleteCard ({cardJob_id, refreshOrder}) {
    const [isModalOpen, setModalOpen] = useState (false);
    const isVerified = useCheckJWT();
    const [isLoading, setIsLoading] = useState(false);
    const [showNotifier, setShowNotifier] = useState(false);
    const [notifierStatus, setNotifierStatus] = useState('');
    const [notifierText, setNotifierText] = useState('')
    
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
                setNotifierStatus('success')
            setNotifierText('Запись успешно удалена')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
                // мб еще что-то, например рефреш страницы
            } else {
                console.error("Ошибка удаления записи");
            }
        } catch (error) {
            console.error("Error:", error);
            setNotifierStatus('error')
            setNotifierText('При отклике на заявку произошла ошибка')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
        } finally {
            setIsLoading(false);
            refreshOrder();
        }
    };

    return (
        <>
        {showNotifier? <TemporaryNotifier status={notifierStatus} text={notifierText} />: null}
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