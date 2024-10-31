import React from "react";
import { Respond } from "./OrderDetails";
import { Completed } from "./OrderDetailsCustomer";
import { Job } from "../services/apiService";

 export default function OrderDetailsMyResponses ({ order }: {
    order: Job;
 }) {

    return(
<>
        <p className="card-header">{order.job.title}</p>
        <p className="card-cost">{order.job.price} ₽/час</p>
        <div className="description-and-status">
        <p className="card-order-description">{order.job.description}</p>
        <p className="card-order-status">{order.job.status}</p>
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
                            { order.job.status_value ==="Закрыта"? <Completed/> : <Respond isResponded= {true} />}
            </div>
        </>
    )
 }