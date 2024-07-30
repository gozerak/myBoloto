import { useState, useEffect } from "react";
import {fetchJobs} from "../services/apiService";

export const useJobs = () => {
    const [jobs, setJobs] = useState ([]);
    // const [actionTypes, setActionTypes] = useState ({});
    // const [places, setPlaces] = useState({});
    // const [organizations, setOrganizations] = useState({})
    // const [jobsLength, setJobsLength] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const jobsData = await fetchJobs()
                setJobs(jobsData);
            } catch (error){
                console.error ("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    return {jobs};
}