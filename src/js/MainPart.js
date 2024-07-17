import "../css/MainPart.css";
import OrderCard from "./OrderCard";
import Filters from "./Filters";


export default function MainPart () {
    return (
        <div className="main">
            <div className="order-cards">
            <OrderCard />
            </div>
            <Filters />
        </div>
    )
}