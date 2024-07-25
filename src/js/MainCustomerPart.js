import Filters from "./Filters"
import OrderCard from "./OrderCard"
import '../css/MainCustomerPart.css'

export default function MainCustomerPart() {
    return(
        <div className="main">
        <div className="order-cards">
            <OrderCard />
        </div>
        <Filters />
        </div>
    )
}