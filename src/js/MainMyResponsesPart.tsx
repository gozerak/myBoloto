import React from "react";
import "../css/MainPart.css";
import OrderCard from "./OrderCard";
import Filters from "./Filters";
import { Job } from "../services/apiService";


export default function MainMyResponsesPart ({ jobs }: {
    jobs: Job[];
}) {
    return (
        <div className="main">
            <div className="order-cards">
            <OrderCard jobs={jobs} />
            </div>
            <Filters />
        </div>
    )
}