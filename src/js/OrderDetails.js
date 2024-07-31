import { useLocation } from "react-router-dom"
// import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import { API_BASE_URL } from "../services/apiService";
import { useState } from "react";

function Respond ({ onClick }) {
    return (
        <button className="respond-btn" onClick={onClick}>Откликнуться</button>
    )
}

async function handleRespond (order_id) {
    if (!localStorage.getItem('userId')){
        console.log ("Необходимо авторизоваться");
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
            //какую нибудь модалочку бы...
        } else {
            const errorData = await response.json();
            console.error ("При отклике на заявку произошла ошибка:", errorData.detail );
        }
    } catch (error){
        console.error ("Error:", error)
    }
};

async function checkUserRespondedJobs() {
    const [userRespondedJobs, setUserRespondedJobs] = useState({})

    let authToken = null;

    if (localStorage.getItem('userId')) {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

        if (cookies) {
            authToken = cookies.split('=')[1];
        }

        if (authToken === null) {
            console.error("Необходимо перелогиниться");
            return;
        }
    }

    fetch(`${API_BASE_URL}/user_manager/get_jobs`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then (response => response.json())
    .then(authData => setUserRespondedJobs(authData))
    .catch(error => console.error("Error fetching user responds: ", error))
}


export default function OrderDetails ({order}) {
    const location = useLocation();
    const isCustomerPage = location.pathname === "/customer";
    return (
        <>
        <p className="card-header">{order.title}</p>
        <p className="card-cost">{order.price} ₽</p>
        <p className="card-order-description">{order.description}</p>
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
                    <div className="edit-delete-buttons">
                    {/* <EditCard order= {order}/> */}
                    <DeleteCard cardJob_id= {order.id} />
                    </div>
                    ) : (
                <Respond onClick={() => handleRespond(order.id)}/>
                )}
            </div>
        </>
    );
}