import Filters from "./Filters"
import OrderCard from "./OrderCard"
import '../css/MainCustomerPart.css'

export default function MainCustomerPart({ jobs, refreshOrder }) {
    return(
        <div className="main">
        <div className="order-cards">
            <OrderCard jobs = {jobs} refreshOrder={refreshOrder}/>
        </div>
        <Filters />
        </div>
    )
}