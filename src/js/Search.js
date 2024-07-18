import "../css/Search.css"
import { useLocation } from "react-router-dom"
import { useJobs } from "../hooks/useJobs";
import { useEffect, useState } from "react";

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
        <form className="search-system">
        <input type="text" placeholder="Type here..." className="search-bar"></input>
        <button type="submit" className="submit">Найти</button>
        </form>
        <p className="total-found">
            {isCustomerPage? "Ваши заявки:": loading ? "Загрузка..." : `Найдено заказов: ${jobsLength}`}
            </p>
        </div>
    )
}