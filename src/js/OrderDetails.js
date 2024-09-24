
import { API_BASE_URL } from "../services/apiService";
import { useEffect, useState } from "react";
import { Completed } from "./OrderDetailsCustomer";
import TemporaryNotifier from "./TemporaryNotifier";

export function Respond ({ onClick, isResponded }) {
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

// function CustomerPageOrderDetail ({respondedUsers, isCustomerPage, order}) {
//     return(
//             <div className="edit-delete-buttons">
//                 <RespondedList respondedUsers={respondedUsers} isCustomerPage={isCustomerPage} order={order} />
//                 <DeleteCard cardJob_id= {order.id} />
//             </div>
//     )
// }

// function AcceptWorkResult() {
//     <div className="">
//         <p>Ответственный: {}</p>
//     </div>
// }

async function handleRespond (order_id, 
    setIsResopnded,
    setShowNotifier, 
    setNotifierStatus, 
    setNotifierText) {
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
            setIsResopnded(true);
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


export default function OrderDetails ({order, respondedJobs}) {
    
    // const isCustomerPage = location.pathname === "/customer";
    const [isResponded, setIsResponded] = useState(false);
    const [userId, setUserId] = useState ("")
    const [showNotifier, setShowNotifier] = useState(false);
    const [notifierStatus, setNotifierStatus] = useState('');
    const [notifierText, setNotifierText] = useState('')
    // const [respondedUsers, setRespondedUsers] = useState ({});
    // const [orderStatus, setOrderStatus] = useState('');

    useEffect(() => {
        if (Array.isArray(respondedJobs)) {
            // const matchedJob = respondedJobs.find(jobData => jobData.job.id === order.id);
            // setOrderStatus(matchedJob? matchedJob.status : '')
            const respondedJobIds = respondedJobs.map(job => job.job.id);
            if (respondedJobIds.includes(order.id)) {
                setIsResponded(true);
            }
        }
        else return;
    }, [respondedJobs, order.id]);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setUserId(localStorage.getItem("userId"))
        }
      }, []);
    
    return (
        <>
        {showNotifier? <TemporaryNotifier status={notifierStatus} text={notifierText} />: null}
        <p className="card-header">{order.title}</p>
        <p className="card-cost">{order.price} ₽</p>
        <div className="description-and-status">
        <p className="card-order-description">{order.description}</p>
        {/* <p className="card-order-status">{orderStatus ? orderStatus : null}</p> */}
        <p className="card-order-status"></p>
        </div>
        <div className="info-card">
        <p className="card-main-info">Период</p>
        <p className="card-order-value">{new Date(order.started_at).toLocaleDateString()} {order.finished_at? `- ${new Date(order.finished_at).toLocaleDateString()}`: null}</p>
        </div>
        <div className="info-card">
        <p className="card-main-info">Род деятельности</p> 
        <p className="card-order-value">{order.action_type.title}</p>
        </div>
        <div className="info-card">
        <p className="card-main-info">Город </p> 
        <p className="card-order-value">{order.city.title}</p>
        </div>
        <div className="info-card">
        <p className="card-main-info">Адрес</p>
        <p className="card-order-value">{order.job_location}</p>
        </div>
        
        <div className="card-employer-container">
                <p className="card-employer">Предприятие</p>
                <p className="card-order-value">{order.organization.title}</p>
                {order.status_value ==="Закрыта"? <Completed /> : 
                    userId === order.owner_id ? (<p className="your-order">Ваш заказ</p>):
                        (isResponded? (
                            <Respond disabled isResponded= {isResponded} />):
                (<Respond onClick={() => handleRespond(order.id, 
                    setIsResponded, 
                    setShowNotifier, 
                    setNotifierStatus, 
                    setNotifierText)} isResponded= {isResponded} order={order}/>)
                )}
            </div>
        </>
    );
}