// // JobContext.js
// import { createContext, useContext, useState, useEffect } from 'react';
// import { fetchJobs, fetchActionTypes, fetchPlaces, fetchOrganizations } from '../services/apiService';

// const JobContext = createContext();

// export const JobProvider = ({ children }) => {
//     const [jobs, setJobs] = useState([]);
//     const [actionTypes, setActionTypes] = useState({});
//     const [places, setPlaces] = useState({});
//     const [organizations, setOrganizations] = useState({});
//     const [jobsLength, setJobsLength] = useState(0);

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const [jobsData, actionTypesData, placesData, organizationsData] = await Promise.all([fetchJobs(), fetchActionTypes(), fetchPlaces(), fetchOrganizations()]);

//                 const actionTypesMap = actionTypesData.reduce((acc, actionType) => {
//                     acc[actionType.id] = actionType.title;
//                     return acc;
//                 }, {});

//                 const placesMap = placesData.reduce((acc, city) => {
//                     acc[city.id] = city.title;
//                     return acc;
//                 }, {});

//                 const organizationsMap = organizationsData.reduce((acc, organization) => {
//                     acc[organization.id] = organization.title;
//                     return acc;
//                 }, {});

//                 const enrichedJobs = jobsData.map(job => ({
//                     ...job,
//                     actionTypeName: actionTypesMap[job.action_type] || job.action_type,
//                     city: placesMap[job.city] || job.city,
//                     organization: organizationsMap[job.organization_id] || job.organization,
//                 }));

//                 setJobs(enrichedJobs);
//                 setActionTypes(actionTypesMap);
//                 setPlaces(placesMap);
//                 setOrganizations(organizationsMap);
//                 setJobsLength(jobsData.length);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         getData();
//     }, []);

//     return (
//         <JobContext.Provider value={{ jobs, actionTypes, places, organizations, jobsLength }}>
//             {children}
//         </JobContext.Provider>
//     );
// };

// export const useJobs = () => {
//     return useContext(JobContext);
// };
