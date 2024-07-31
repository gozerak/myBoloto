import "../css/OrderCard.css"
import OrderDetails from "./OrderDetails";


export default function OrderCard ({ jobs }) {
    if (!Array.isArray(jobs)) {
        return null;
    }

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