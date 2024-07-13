import Search from "./Search";
import "../css/MainPart.css";
import OrderCard from "./OrderCard";
import Filters from "./Filters";


export default function MainPart () {
    return (
        <div className="main">
            <Search />
            <OrderCard />
            <Filters />
        </div>
    )
}