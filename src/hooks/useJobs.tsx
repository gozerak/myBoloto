import { useState, useEffect } from "react";
import {fetchJobs, Job} from "../services/apiService";

export const useJobs = () => {
    const [jobs, setJobs] = useState<Job[]> ([]);
    const [jobsLength, setJobsLength] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const isAuthorized = !!localStorage.getItem('userId')

    useEffect(() => {
        const getData = async () => {
            try {
                const jobsData = await fetchJobs(isAuthorized)
                setJobs(jobsData);
                setJobsLength(jobsData.length);
            } catch (error){
                console.error ("Error fetching jobs data:", error);
            } finally {
                setLoading (false);
            }
        };
        getData();
    }, [isAuthorized]);

    return {jobs, jobsLength, loading};
}