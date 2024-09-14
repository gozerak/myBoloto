import "../css/OrderCard.css";
import OrderDetails from "./OrderDetails";
import { useLocation } from "react-router-dom";
import OrderDetailsCustomer from "./OrderDetailsCustomer";
import OrderDetailsMyResponses from "./OrderDetailsMyResponses";

export default function OrderCard ({ jobs, respondedJobs = null }) {
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
                <OrderDetailsCustomer order = {order} respondedJobs = {respondedJobs} />
                </div>
                      ))):( isMyResponsesPage? (
                        jobs.map(order => (
                            <div key={order.job.id} className="order-card">
                                <OrderDetailsMyResponses order = {order} />
                                </div>
                                      ))
                      ):
                        (jobs.map(order => (
                            <div key={order.id} className="order-card">
                                <OrderDetails order = {order} respondedJobs = {respondedJobs}/>
                                </div> 
                     )) )
                      )
                      }
    </>
    )
}