import React from "react"
import Filters from "./Filters"
import OrderCard from "./OrderCard"
import '../css/MainCustomerPart.css'
import { MyCreatedJobsArray } from "../services/apiService"

export default function MainCustomerPart({ jobs, refreshOrder }: {
    jobs: MyCreatedJobsArray;
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