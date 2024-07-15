import "../css/Search.css"
import { useLocation } from "react-router-dom"

export default function Search () {
    const location = useLocation();
    const isCustomerPage = location.pathname === "/customer";

    return (
        <div className="search-form">
        <form className="search-system">
        <input type="text" placeholder="Type here..." className="search-bar"></input>
        <button type="submit" className="submit">Найти</button>
        </form>
        <p className="total-found">
            {isCustomerPage? "Ваши заявки:": "Найдено 16 заказов:"}
            </p>
        </div>
    )
}