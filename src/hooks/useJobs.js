import { useState, useEffect } from "react";
import { fetchJobs, fetchActionTypes, fetchPlaces, fetchOrganizations } from "../services/apiService";

export const useJobs = () => {
    const [jobs, setJobs] = useState ([]);
    const [actionTypes, setActionTypes] = useState ({});
    const [places, setPlaces] = useState({});
    const [organizations, setOrganizations] = useState({})
    const [jobsLength, setJobsLength] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const [jobsData, actionTypesData, placesData, organizationsData] = await Promise.all ([fetchJobs(), fetchActionTypes(), fetchPlaces(), fetchOrganizations()]);

                const actionTypesMap = actionTypesData.reduce((acc, actionType) => {
                    acc[actionType.id] = actionType.title;
                    return acc;
                }, {});

                const placesMap = placesData.reduce((acc, place) => {
                    acc[place.id] = place.title;
                    // console.log(acc)
                    return acc;
                }, {});

                const organizationsMap = organizationsData.reduce((acc, organization) => {
                    acc[organization.id] = organization.title;
                    return acc;
                }, {})

                const enrichedJobs = jobsData.map (job => ({
                    ...job,
                    actionTypeName: actionTypesMap[job.action_type] || job.action_type,
                    place: placesMap[job.location] || job.location,
                    organization: organizationsMap[job.organization_id] || job.organization,
                }));
                setJobs(enrichedJobs);
                setActionTypes(actionTypesMap);
                setPlaces(placesMap);
                setOrganizations(organizationsMap);
                setJobsLength(jobsData.length)
            } catch (error){
                console.error ("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    return {jobs, actionTypes, places, organizations, jobsLength};
}