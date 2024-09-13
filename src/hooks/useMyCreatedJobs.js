import { useState, useEffect } from "react";
import {fetchMyCreatedJobs} from "../services/apiService";

export const useMyCreatedJobs = () => {
    const [jobs, setJobs] = useState ([]);
    // const [jobsLength, setJobsLength] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const jobsData = await fetchMyCreatedJobs()
                setJobs(jobsData);
                // setJobsLength(jobsData.length);
            } catch (error){
                console.error ("Error fetching data:", error);
            } finally {
                setLoading (false);
            }
        };
        getData();
    }, []);

    return {jobs, loading};
}