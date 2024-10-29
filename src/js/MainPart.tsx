import React from "react";
import "../css/MainPart.css";
import OrderCard from "./OrderCard";
import Filters from "./Filters";
import { Job, UserRespondedJobsWithStatus } from "../services/apiService";


export default function MainPart ({ jobs, respondedJobs }: {
    jobs: Job[];
    respondedJobs: UserRespondedJobsWithStatus[];
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