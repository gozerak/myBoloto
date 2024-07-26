import "../css/Search.css"
import { useLocation } from "react-router-dom"
import { useJobs } from "../hooks/useJobs";
import { useEffect, useState } from "react";
import AddJobButton from "./AddJobButton"
import "../css/AddJobButton.css"

export default function Search () {
    const {jobsLength} = useJobs(); 
    const location = useLocation();
    const isCustomerPage = location.pathname === "/customer";
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading (false);
        }, 100);
    
        return () => clearTimeout(timer);
    }, [jobsLength]);

    return (
        <div className="search-form">
            <div className="search-and-add-card">
        <form className="search-system">
        <input type="text" autoComplete="off" placeholder="Type here..." className="search-bar"></input>
        <button type="submit" className="submit">Найти</button>
        </form>
        {isCustomerPage? <AddJobButton /> :null}
        </div>
        <p className="total-found">
            {isCustomerPage? "Ваши заявки:": loading ? "Загрузка..." : `Найдено заказов: ${jobsLength}`}
            </p>
        </div>
    )
}