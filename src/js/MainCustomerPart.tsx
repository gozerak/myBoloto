import React from "react"
import Filters from "./Filters"
import OrderCard from "./OrderCard"
import '../css/MainCustomerPart.css'
import { Job } from "../services/apiService"

//страница менеджера (Мои заказы)
export default function MainCustomerPart({ jobs, refreshOrder }: {
    jobs: Job[];
    refreshOrder?: () => void;
}) {
    return(
        <div className="main">
        <div className="order-cards">
            <OrderCard jobs = {jobs} refreshOrder={refreshOrder}/>
        </div>
        <Filters />
        </div>
    )
}