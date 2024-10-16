import { API_BASE_URL } from "../services/apiService"
import { useState } from "react"
import "../css/DeleteCard.css"
import "../css/OrderCard.css"
import "../css/AcceptWorkBtn.css"
import Modal from "./Modal";
import { useCheckJWT } from "../hooks/CheckJWT";
import TemporaryNotifier from "./TemporaryNotifier"

export default function AcceptWorkBtn({user, work, userId, jobId, refreshOrder}) {

    const [isModalOpen, setModalOpen] = useState (false);
    const isVerified = useCheckJWT();
    const [isLoading, setIsLoading] = useState(false);
    const [hours, setHours] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [kpi, setKpi] = useState(0);
    const [showNotifier, setShowNotifier] = useState(false);
    const [notifierStatus, setNotifierStatus] = useState('');
    const [notifierText, setNotifierText] = useState('')

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
            console.log(hours)
        

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/accept_and_close_job?user_id=${userId}&job_id=${jobId}`, { method: "PUT"
             ,
            headers: {
               "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                hours: hours,
                kpi: kpi,
            })
            });
            if (response.ok) {
                console.log("Вы подтвердили выполнение работы!");
                sendRating(authToken)
                setNotifierStatus('success')
            setNotifierText('Вы подтвердили выполнение работы!')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
            } else {
                console.error("Ошибка подтверждения выполнения работы");
                setNotifierStatus('error')
            setNotifierText('Ошибка подтверждения выполнения работы')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }};

    async function sendRating(authToken) {
        try {
            const response = await fetch(`${API_BASE_URL}/user_rating/add`, { method: "POST"
             ,
            headers: {
               "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                user_id: userId,
                rating_value: rating,
                comment: comment,
            })
            });
            if (response.ok) {
                console.log("Вы отправили рейтинг пользователя!");
                setModalOpen(false);
                
                // мб еще что-то, например рефреш страницы
            } else {
                console.error("Ошибка отправки рейтинга");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
            refreshOrder();
        }
        
    }

    const handleKpiChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) {
            value = "";
        } else if (value > 100) {
            value = 100;
        } else if (value < 0) {
            value = 0;
        }
        setKpi(value);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setHours("");
        setRating(0);
        setKpi("");
    }

    const handleChangeHours = (e) => {
        setHours(parseInt(e.target.value))
    }

    return (
        <>
        {showNotifier? <TemporaryNotifier status={notifierStatus} text={notifierText} />: null}
        <button className="accept-card-btn" onClick={() => setModalOpen(true)}>Подтвердить выполнение</button>
        <Modal isOpen={isModalOpen} onClose={() => handleCloseModal()}>
            <div className="delete-modal">
            <p className="delete-question">{`Вы действительно хотите подтвердить выполнение заказа ${work} пользователем ${user}?`}</p>
            <div className="kpi-and-hours-and-rating">
            <div className="hours-rating">
                <p>Количество часов</p>
                <div className="kpi">
                    <input 
                    type="number" 
                    className="kpi-input" 
                    value={hours}
                    onChange={handleChangeHours}
                    onWheel={(e) => e.target.blur()}
                    min={0}
                    max={100}
                    />
                    {/* <p></p> */}
                </div>
                </div>
                <div className="kpi-rating">
                <p>KPI</p>
                <div className="kpi">
                    <input 
                    type="number" 
                    className="kpi-input" 
                    value={kpi}
                    onChange={handleKpiChange}
                    onWheel={(e) => e.target.blur()}
                    min={0}
                    max={100}
                    />
                    <p>%</p>
                </div>
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
            <div className="comment-accept-work">
                <p className="comment-accept-work-title">Отзыв о выполнении работы:</p>
                <input 
                className="comment-accept-work-input"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)} />
            </div>
            <div className="delete-buttons">
            <button type='button' className='delete-btn-back' onClick={() => handleCloseModal()}>Отмена</button>
            <button type='submit' className='delete-btn-submit' onClick={() => handleAcceptWork()} disabled={rating === 0 || hours ==="" || kpi ===""}>
            {isLoading? "Загрузка...": "Подтвердить"}
            </button>
            </div>
            </div>
        </Modal>
        </>
    )
}