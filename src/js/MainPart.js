import Search from "./Search";
import "../css/MainPart.css";
import OrderCard from "./OrderCard";


export default function MainPart () {
    return (
        <div className="main">
            <Search />
            <OrderCard />
        </div>
    )
}