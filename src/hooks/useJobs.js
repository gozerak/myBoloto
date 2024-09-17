import { useState, useEffect } from "react";
import {fetchJobs} from "../services/apiService";

export const useJobs = () => {
    const [jobs, setJobs] = useState ([]);
    const [jobsLength, setJobsLength] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const jobsData = await fetchJobs()
                setJobs(jobsData);
                setJobsLength(jobsData.length);
            } catch (error){
                console.error ("Error fetching jobs data:", error);
            } finally {
                setLoading (false);
            }
        };
        getData();
    }, []);

    return {jobs, jobsLength, loading};
}