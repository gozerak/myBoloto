import Filters from "./Filters"
import OrderCard from "./OrderCard"
import '../css/MainCustomerPart.css'

export default function MainCustomerPart({ jobs }) {
    return(
        <div className="main">
        <div className="order-cards">
            <OrderCard jobs = {jobs}/>
        </div>
        <Filters />
        </div>
    )
}