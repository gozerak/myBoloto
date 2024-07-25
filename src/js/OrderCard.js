import "../css/OrderCard.css"
import OrderDetails from "./OrderDetails"
import { useJobs } from "../hooks/useJobs";


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