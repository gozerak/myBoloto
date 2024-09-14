import { API_BASE_URL } from "../services/apiService"
import { useState } from "react"
import "../css/DeleteCard.css"
import "../css/OrderCard.css"
import Modal from "./Modal";
import { useCheckJWT } from "../hooks/CheckJWT";

export default function AcceptWorkBtn({user, work, userId, jobId}) {

    const [isModalOpen, setModalOpen] = useState (false);
    const isVerified = useCheckJWT();
    const [isLoading, setIsLoading] = useState(false);
    
    async function handleAcceptWork() {
        if (!isVerified) {
            console.error("JWT не прошла проверку");
            return;
        }
        else {
            let authToken;
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken= (cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
                return
            }
        

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/accept_and_close_job?user_id=${userId}&job_id=${jobId}`, { method: "PUT"
             ,
            headers: {
               "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
                "Access-Control-Allow-Origin": "*"
            }
            });
            if (response.ok) {
                console.log("Вы подтвердили выполнение работы!");
                setModalOpen(false);
                // мб еще что-то, например рефреш страницы
            } else {
                console.error("Ошибка подтверждения выполнения работы");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
            window.location.reload()
        }
    }};
    return (
        <>
        <button className="accept-card-btn" onClick={() => setModalOpen(true)}>Подтвердить выполнение</button>
        <Modal isOpen={isModalOpen} onClose={() =>setModalOpen(false)}>
            <div className="delete-modal">
            <p className="delete-question">{`Вы действительно хотите подтвердить выполнение заказа ${work} пользователем ${user}?`}</p>
            <div className="delete-buttons">
            <button type='button' className='delete-btn-back' onClick={() => setModalOpen(false)}>Отмена</button>
            <button type='submit' className='delete-btn-submit' onClick={() => handleAcceptWork()} disabled={isLoading}>
            {isLoading? "Загрузка...": "Подтвердить"}
            </button>
            </div>
            </div>
        </Modal>
        </>
    )
}