import React from "react";
import { API_BASE_URL, Job} from "../services/apiService";
import { useEffect, useState } from "react";
import { Completed } from "./OrderDetailsCustomer";
import TemporaryNotifier from "./TemporaryNotifier";

export function Respond ({ onClick, isResponded }: {
    onClick?: () => void;
    isResponded: boolean;
}) {
    return (
        <button
        className={isResponded? "responded-btn" : "respond-btn"} 
        onClick={onClick}
         disabled={isResponded}
         >
            {isResponded? 'Вы уже откликнулись' :'Откликнуться'}
            </button>
    )
}
//Функция для того, чтобы откликнуться
async function handleRespond (order_id: string, 
    setIsResponded: React.Dispatch<React.SetStateAction<boolean>>,
    setShowNotifier: React.Dispatch<React.SetStateAction<boolean>>, 
    setNotifierStatus: React.Dispatch<React.SetStateAction<string>>, 
    setNotifierText: React.Dispatch<React.SetStateAction<string>>) {
    if (!localStorage.getItem('userId')){
        console.log ("Необходимо авторизоваться");
        alert("Необходимо авторизоваться")
        return;
    }
    try {
        const response = await fetch (`${API_BASE_URL}/user_manager/response_for_job?user_id=${localStorage.getItem('userId')}&job_id=${order_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",  
            },
        });
        if (response.ok) {
            console.log('Вы откликнулись на заявку!');
            setIsResponded(true);
            setNotifierStatus('success')
            setNotifierText('Вы успешно откликнулись!')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
        } else {
            const errorData = await response.json();
            console.error ("При отклике на заявку произошла ошибка:", errorData.detail );
            setNotifierStatus('error')
            setNotifierText('При отклике на заявку произошла ошибка')
            setShowNotifier(true)
            setTimeout(() => {
                setShowNotifier(false);
              }, 5000)
        }
    } catch (error){
        console.error ("Error:", error)
    }
};

//Карточка для страницы Поиск работы
export default function OrderDetails ({order, respondedJobs}: {
    order: Job;
    respondedJobs: Job[];
}) {
    
    const [isResponded, setIsResponded] = useState(false);
    const [userId, setUserId] = useState ("")
    const [showNotifier, setShowNotifier] = useState(false);
    const [notifierStatus, setNotifierStatus] = useState('');
    const [notifierText, setNotifierText] = useState('');

    //проверка на отображения Вы уже откликнулись
    useEffect(() => {
        if (Array.isArray(respondedJobs)) {
            const respondedJobIds = respondedJobs.map(job => job.job.id);
            if (respondedJobIds.includes(order.job.id)) {
                setIsResponded(true);
            }
        }
        else return;
    }, [respondedJobs, order.job.id]);

    useEffect(() => {
        let userId: string | null = localStorage.getItem("userId");
        if (userId) {
            setUserId(userId)
        }
      }, []);
    
    return (
        <>
        {showNotifier? <TemporaryNotifier status={notifierStatus} text={notifierText} />: null}
        <p className="card-header">{order.job.title}</p>
        <p className="card-cost">{order.job.price} ₽/час</p>
        <div className="description-and-status">
        <p className="card-order-description">{order.job.description}</p>
        {/* <p className="card-order-status">{orderStatus ? orderStatus : null}</p> */}
        <p className="card-order-status"></p>
        </div>
        <div className="info-card">
        <p className="card-main-info">Период</p>
        <p className="card-order-value">{new Date(order.job.started_at).toLocaleDateString()} {order.job.finished_at? `- ${new Date(order.job.finished_at).toLocaleDateString()}`: null}</p>
        </div>
        <div className="info-card">
        <p className="card-main-info">Род деятельности</p> 
        <p className="card-order-value">{order.job.action_type.title}</p>
        </div>
        <div className="info-card">
        <p className="card-main-info">Город </p> 
        <p className="card-order-value">{order.job.city.title}</p>
        </div>
        <div className="info-card">
        <p className="card-main-info">Адрес</p>
        <p className="card-order-value">{order.job.job_location}</p>
        </div>
        
        <div className="card-employer-container">
                <p className="card-employer">Предприятие</p>
                <p className="card-order-value">{order.job.organization.title}</p>
                {order.job.status_value ==="Закрыта"? <Completed /> : 
                    userId === order.job.owner_id ? (<p className="your-order">Ваш заказ</p>):
                        (isResponded? (
                            <Respond isResponded= {isResponded} />):
                (<Respond onClick={() => handleRespond(order.job.id, 
                    setIsResponded, 
                    setShowNotifier, 
                    setNotifierStatus, 
                    setNotifierText)} isResponded= {isResponded}/>)
                )}
            </div>
        </>
    );
}