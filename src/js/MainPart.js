import "../css/MainPart.css";
import OrderCard from "./OrderCard";
import Filters from "./Filters";


export default function MainPart ({ jobs, respondedJobs }) {
    return (
        <div className="main">
            <div className="order-cards">
            <OrderCard jobs={jobs} respondedJobs = {respondedJobs} />
            </div>
            <Filters />
        </div>
    )
}