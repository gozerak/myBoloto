import { useLocation } from "react-router-dom"
// import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import { API_BASE_URL } from "../services/apiService";
import { useEffect, useState } from "react";
import RespondedList from "./RespondedList";

function Respond ({ onClick, isResponded }) {
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

function CustomerPageOrderDetail ({respondedUsers, isCustomerPage, order}) {
    return(
            <div className="edit-delete-buttons">
                <RespondedList respondedUsers={respondedUsers} isCustomerPage={isCustomerPage} order={order} />
                <DeleteCard cardJob_id= {order.id} />
            </div>
    )
}

// function AcceptWorkResult() {
//     <div className="">
//         <p>Ответственный: {}</p>
//     </div>
// }

async function handleRespond (order_id, setIsResopnded) {
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
            //какую нибудь модалочку бы...
        } else {
            const errorData = await response.json();
            console.error ("При отклике на заявку произошла ошибка:", errorData.detail );
        }
    } catch (error){
        console.error ("Error:", error)
    }
};


export default function OrderDetails ({order, respondedJobs}) {
    const location = useLocation();
    
    const isCustomerPage = location.pathname === "/customer";
    const [isResponded, setIsResponded] = useState(false);
    const [respondedUsers, setRespondedUsers] = useState ({});
    const [orderStatus, setOrderStatus] = useState('');


    useEffect(() => {
        if (Array.isArray(respondedJobs)) {
            const matchedJob = respondedJobs.find(jobData => jobData.id === order.id);
            setOrderStatus(matchedJob? matchedJob.status : '')
            const respondedJobIds = respondedJobs.map(job => job.id);
            if (respondedJobIds.includes(order.id)) {
                setIsResponded(true);
            }
        }
        else return;
    }, [respondedJobs, order.id]);

    useEffect(() => {
        const fetchRespondedUsers = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/jobs/get_job_relationship?job_id=${order.id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              }
            });
            const data = await response.json();
            setRespondedUsers(data);
          } catch (error) {
            console.error("Error fetching responded users:", error);
          }
        };
    
        fetchRespondedUsers();
      }, [order.id]);
    
    return (
        <>
        <p className="card-header">{order.title}</p>
        <p className="card-cost">{order.price} ₽</p>
        <div className="description-and-status">
        <p className="card-order-description">{order.description}</p>
        <p className="card-order-status">{orderStatus ? orderStatus : null}</p>
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
                {isCustomerPage? (
                 <CustomerPageOrderDetail respondedUsers={respondedUsers} isCustomerPage={isCustomerPage} order={order}/>) : (
                        isResponded? (
                            <Respond disabled isResponded= {isResponded} />):
                (<Respond onClick={() => handleRespond(order.id, setIsResponded)} isResponded= {isResponded} order={order}/>)
                )}
            </div>
        </>
    );
}