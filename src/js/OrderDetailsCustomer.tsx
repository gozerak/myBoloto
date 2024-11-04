// import { useLocation } from "react-router-dom"
import React from "react";
import DeleteCard from "./DeleteCard";
import { API_BASE_URL, fetchRespondedUsers, fetchUserRespondedJobs, Job, RespondedUser, UserData } from "../services/apiService";
import { useEffect, useState } from "react";
import RespondedList from "./RespondedList";
import AcceptWorkBtn from "./AcceptWorkBtn";


function CustomerPageOrderDetail ({respondedUsers, isCustomerPage, order, refreshOrder}: {
  respondedUsers: UserData[];
  isCustomerPage: boolean;
  order: Job;
  refreshOrder: () => void;
}) {
    return(
            <div className="edit-delete-buttons">
                <RespondedList respondedUsers={respondedUsers} isCustomerPage={isCustomerPage} order={order} refreshOrder={refreshOrder} />
                <DeleteCard cardJob_id= {order.job.id} refreshOrder={refreshOrder} />
            </div>
    )
}

function AcceptWorkResult({ order, refreshOrder }: {
  order: Job;
  refreshOrder: () => void;
}) {
  if(hasRespondedUser(order)){
  return(
    <div className="accept-work-elem">
        <p className="responsible-customer-card">Ответственный: {order.responded_user.full_name}</p>
        <div className="edit-delete-buttons">
        <AcceptWorkBtn user = { order.responded_user.full_name } work = { order.job.title } userId = { order.responded_user.id } jobId = { order.job.id } refreshOrder={refreshOrder} />
        <DeleteCard cardJob_id= {order.job.id} refreshOrder={refreshOrder} />
        </div>
    </div>
  )
}
}

export function Completed () {
  return (
    <div className="completed">
      <p>Выполнено</p>
      <img id ="completed-img" src="../img/completed.svg" alt="Выполено" height="50px" width="50px" />
    </div>
  )
}

function hasRespondedUser(order: Job): order is Job & { responded_user: RespondedUser } {
  return order.responded_user !== undefined;
}



export default function OrderDetailsCustomer ({order, refreshOrder}: {
  order: Job;
  refreshOrder: () => void;
}) {
  console.log(order.responded_user === null)
  const [respondedUsers, setRespondedUsers] = useState<UserData[]>([]);
  useEffect(() => {
    const loadRespondedUsers = async () => {
      try {
        const users = await fetchRespondedUsers(order.job.id);
        setRespondedUsers(users);
      } catch (error) {
        console.error("Failed to fetch responded users:", error);
      }
    };
    loadRespondedUsers();
  }, [order.job.id]);

  const isCustomerPage = true;
    
    return (
        <>
        <p className="card-header">{order.job.title}</p>
        <p className="card-cost">{order.job.price} ₽/час</p>
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
                  (order.responded_user? <AcceptWorkResult order={order} refreshOrder={refreshOrder}/>:
                   <CustomerPageOrderDetail respondedUsers={respondedUsers} isCustomerPage={isCustomerPage} order={order} refreshOrder={refreshOrder}/>)}
            </div>
        </>
    );
}