import "../css/OrderCard.css"
import { useJobs } from "../hooks/useJobs";
import OrderDetails from "./OrderDetails";


export default function OrderCard () {
    const { jobs } = useJobs()

    return(
    <>
        {jobs.map(order => (
            <div key={order.id} className="order-card">
                <OrderDetails order = {order} />
                </div>
                      ))}
    </>
    )
}