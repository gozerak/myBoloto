import Filters from "./Filters"
import OrderCard from "./OrderCard"
import '../css/MainCustomerPart.css'

export default function MainCustomerPart({ jobs, respondedJobs }) {
    return(
        <div className="main">
        <div className="order-cards">
            <OrderCard jobs = {jobs} respondedJobs = {respondedJobs} />
        </div>
        <Filters />
        </div>
    )
}