import Filters from "./Filters"
import OrderCard from "./OrderCard"
import '../css/MainCustomerPart.css'
import AddJobButton from "./AddJobButton"

export default function MainCustomerPart() {
    return(
        <div className="main">
        <div className="order-cards">
            <OrderCard />
        </div>
        <div className="customer-fil-btn">
        <AddJobButton />
        <Filters />
        </div>
        </div>
    )
}