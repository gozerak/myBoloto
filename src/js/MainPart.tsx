import React from "react";
import "../css/MainPart.css";
import OrderCard from "./OrderCard";
import Filters from "./Filters";
import { Job} from "../services/apiService";

//страница пользователя (Поиск работы)
export default function MainPart ({ jobs, respondedJobs }: {
    jobs: Job[];
    respondedJobs: Job[];
}) {
    return (
        <div className="main">
            <div className="order-cards">
            <OrderCard jobs={jobs} respondedJobs = {respondedJobs} />
            </div>
            <Filters />
        </div>
    )
}