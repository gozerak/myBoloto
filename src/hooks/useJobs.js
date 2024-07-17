import { useState, useEffect } from "react";
import { fetchJobs, fetchActionTypes, fetchPlaces } from "../services/apiService";

export const useJobs = () => {
    const [jobs, setJobs] = useState ([]);
    const [actionTypes, setActionTypes] = useState ({});
    const [places, setPlaces] = useState({});
    const [jobsLength, setJobsLength] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const [jobsData, actionTypesData, placesData] = await Promise.all ([fetchJobs(), fetchActionTypes(), fetchPlaces()]);

                const actionTypesMap = actionTypesData.reduce((acc, actionType) => {
                    acc[actionType.id] = actionType.title;
                    return acc;
                }, {});

                const placesMap = placesData.reduce((acc, place) => {
                    acc[place.id] = place.title;
                    return acc;
                }, {});

                const enrichedJobs = jobsData.map (job => ({
                    ...job,
                    actionTypeName: actionTypesMap[job.action_type] || job.action_type,
                    place: placesMap[job.location] || job.location,
                }));
                setJobs(enrichedJobs);
                setActionTypes(actionTypesMap);
                setPlaces(placesMap);
                setJobsLength(jobsData.length)
            } catch (error){
                console.error ("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    return {jobs, actionTypes, places, jobsLength};
}