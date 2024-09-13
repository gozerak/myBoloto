import "../css/OrderCard.css";
import OrderDetails from "./OrderDetails";
import { useLocation } from "react-router-dom";
import OrderDetailsCustomer from "./OrderDetailsCustomer";

export default function OrderCard ({ jobs, respondedJobs }) {
    const location = useLocation();
    const isCustomerPage = location.pathname === "/customer";
    if (!Array.isArray(jobs)) {
        return null;
    }
    console.log(isCustomerPage)
    console.log(jobs)
    return(
    <>
    {isCustomerPage?
        (jobs.map(order => (
            <div key={order.job.id} className="order-card">
                <OrderDetailsCustomer order = {order} respondedJobs = {respondedJobs} />
                </div>
                      ))):(
                        jobs.map(order => (
                            <div key={order.id} className="order-card">
                                <OrderDetails order = {order} respondedJobs = {respondedJobs} />
                                </div> 
                     )) )
                      
                      }
    </>
    )
}