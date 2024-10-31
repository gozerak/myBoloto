import React from "react";
import "../css/OrderCard.css";
import OrderDetails from "./OrderDetails";
import { useLocation } from "react-router-dom";
import OrderDetailsCustomer from "./OrderDetailsCustomer";
import OrderDetailsMyResponses from "./OrderDetailsMyResponses";
import { Job, UserRespondedJobsWithStatus } from '../services/apiService';

export default function OrderCard ({ jobs, respondedJobs, refreshOrder }: {
    jobs: Job[]
    respondedJobs?: UserRespondedJobsWithStatus[];
    refreshOrder?: () => void;
}) {
    const location = useLocation();
    const isCustomerPage = location.pathname === "/customer";
    const isMyResponsesPage = location.pathname === "/myresponses"
    if (!Array.isArray(jobs)) {
        return null;
    }
    
    return(
    <>
    {isCustomerPage?
        (jobs.map(order => (
            <div key={order.job.id} className="order-card">
                <OrderDetailsCustomer order = {order} refreshOrder={refreshOrder}/>
                </div>
                      ))):( isMyResponsesPage? (
                        jobs.map(order => (
                            <div key={order.job.id} className="order-card">
                                <OrderDetailsMyResponses order = {order} />
                                </div>
                                      ))
                      ):
                        (respondedJobs? (jobs.map(order => (
                            <div key={order.job.id} className="order-card">
                                <OrderDetails order = {order} respondedJobs = {respondedJobs}/>
                                </div> 
                     )) ): null
                      ))
                      }
    </>
    )
}