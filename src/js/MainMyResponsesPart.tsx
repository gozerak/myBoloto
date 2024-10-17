import "../css/MainPart.css";
import OrderCard from "./OrderCard";
import Filters from "./Filters";


export default function MainMyResponsesPart ({ jobs }) {
    return (
        <div className="main">
            <div className="order-cards">
            <OrderCard jobs={jobs} />
            </div>
            <Filters />
        </div>
    )
}