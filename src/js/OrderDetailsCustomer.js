// import { useLocation } from "react-router-dom"
import DeleteCard from "./DeleteCard";
import { API_BASE_URL } from "../services/apiService";
import { useEffect, useState } from "react";
import RespondedList from "./RespondedList";
import AcceptWorkBtn from "./AcceptWorkBtn";


function CustomerPageOrderDetail ({respondedUsers, isCustomerPage, order}) {
    return(
            <div className="edit-delete-buttons">
                <RespondedList respondedUsers={respondedUsers} isCustomerPage={isCustomerPage} order={order} />
                <DeleteCard cardJob_id= {order.job.id} />
            </div>
    )
}

function AcceptWorkResult({ order }) {
  console.log(order)
  return(
    <div className="accept-work-elem">
        <p className="responsible-customer-card">Ответственный: {order.responded_user.full_name}</p>
        <div className="edit-delete-buttons">
        <AcceptWorkBtn user = { order.responded_user.full_name } work = { order.job.title } userId = { order.responded_user.id } jobId = { order.job.id } />
        <DeleteCard cardJob_id= {order.job.id} />
        </div>
    </div>
  )
}

export function Completed () {
  return (
    <div className="completed">
      <p>Выполнено</p>
      <img id ="completed-img" src="../img/completed.svg" alt="Выполено" height="50px" width="50px" />
    </div>
  )
}


export default function OrderDetails ({order}) {
  const [respondedUsers, setRespondedUsers] = useState ({});
  const isCustomerPage = true;

    useEffect(() => {
        const fetchRespondedUsers = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/jobs/get_job_relationship?job_id=${order.job.id}`, {
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
      }, [order.job.id]);
    
    return (
        <>
        <p className="card-header">{order.job.title}</p>
        <p className="card-cost">{order.job.price} ₽</p>
        <div className="description-and-status">
        <p className="card-order-description">{order.job.description}</p>
        <p className="card-order-status">{order.job.status ? order.job.status : null}</p>
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
                 {order.job.status_value ==="Закрыта"?
                  ( <Completed/>):
                  (order.responded_user.id!== null? <AcceptWorkResult order={order}/>:
                   <CustomerPageOrderDetail respondedUsers={respondedUsers} isCustomerPage={isCustomerPage} order={order}/>)}
            </div>
        </>
    );
}