import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/apiService";


export const useRespondedJobs = () => {
    const [userRespondedJobs, setUserRespondedJobs] = useState({})
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                setAuthToken(cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
                setUserRespondedJobs({ error: "Необходимо перелогиниться" });
            }
        }
    }, []);

    useEffect(() => {
        if (authToken) {
     fetch(`${API_BASE_URL}/user_manager/get_user_assigned_jobs`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then (response => response.json())
    // .then (responseData => responseData.map(responseDataObj => responseDataObj.job))
    .then(userJobsData => setUserRespondedJobs(userJobsData))
    .catch(error => console.error("Error fetching user responds: ", error))
}}, [authToken]);
    return {userRespondedJobs};
}