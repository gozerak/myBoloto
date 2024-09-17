import { API_BASE_URL } from "../services/apiService"
import { useState } from "react"
import "../css/DeleteCard.css"
import "../css/OrderCard.css"
import "../css/AcceptWorkBtn.css"
import Modal from "./Modal";
import { useCheckJWT } from "../hooks/CheckJWT";

export default function AcceptWorkBtn({user, work, userId, jobId}) {

    const [isModalOpen, setModalOpen] = useState (false);
    const isVerified = useCheckJWT();
    const [isLoading, setIsLoading] = useState(false);
    const [kpi, setKpi] = useState("");
    const [rating, setRating] = useState(0);

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

    const handleCloseModal = () => {
        setModalOpen(false);
        setKpi("");
        setRating(0);
    }

    const handleKpiChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) {
            value = 0;
        } else if (value > 100) {
            value = 100;
        } else if (value < 0) {
            value = 0;
        }
        setKpi(value);
    };

    return (
        <>
        <button className="accept-card-btn" onClick={() => setModalOpen(true)}>Подтвердить выполнение</button>
        <Modal isOpen={isModalOpen} onClose={() => handleCloseModal()}>
            <div className="delete-modal">
            <p className="delete-question">{`Вы действительно хотите подтвердить выполнение заказа ${work} пользователем ${user}?`}</p>
            <div className="kpi-rating">
                <p>KPI</p>
                <div className="kpi">
                    <input 
                    type="number" 
                    className="kpi-input" 
                    value={kpi}
                    onChange={handleKpiChange}
                    min={0}
                    max={100}
                    />
                    <p>%</p>
                </div>
                <div className="rating">
                <p className="kpi-rating-title">Рейтинг</p>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={star <= rating ? "star filled" : "star"}
                                    onClick={() => setRating(star)}
                                    style={{ cursor: "pointer", fontSize: "24px", color: star <= rating ? "#FFD700" : "#ccc", marginTop: "10px" }}
                                >
                                    ★
                                </span>
                            ))}
                </div>
            </div>
            <div className="delete-buttons">
            <button type='button' className='delete-btn-back' onClick={() => handleCloseModal()}>Отмена</button>
            <button type='submit' className='delete-btn-submit' onClick={() => handleAcceptWork()} disabled={rating === 0 || kpi ===""}>
            {isLoading? "Загрузка...": "Подтвердить"}
            </button>
            </div>
            </div>
        </Modal>
        </>
    )
}