import "../css/Search.css"
import { useLocation } from "react-router-dom"
import AddJobButton from "./AddJobButton"
import "../css/AddJobButton.css"

export default function Search ({ jobsLength, refreshOrder }) {
    const location = useLocation();
    const isCustomerPage = location.pathname === "/customer";



    return (
        <div className="search-form">
            <div className="search-and-add-card">
        <form className="search-system">
        <input type="text" autoComplete="off" placeholder="Type here..." className="search-bar"></input>
        <button type="submit" className="submit">Найти</button>
        </form>
        {isCustomerPage? <AddJobButton refreshOrder={refreshOrder} /> :null}
        </div>
        <p className="total-found">
            {isCustomerPage? "Ваши заявки:":
             (jobsLength? (`Найдено заказов: ${jobsLength}`): "")}
            </p>
        </div>
    )
}