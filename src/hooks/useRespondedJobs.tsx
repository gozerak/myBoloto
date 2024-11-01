import { useEffect, useState } from "react";
import { API_BASE_URL, fetchUserRespondedJobs, Job, UserRespondedJobsWithStatus } from "../services/apiService";



export const useRespondedJobs = () => {
    const [userRespondedJobs, setUserRespondedJobs] = useState<Job[]>([]);
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                setAuthToken(cookies.split('=')[1]);
            } else {
                console.error("Необходимо перелогиниться");
                // setUserRespondedJobs([ error: "Необходимо перелогиниться" ]);
            }
        }
    }, []);

    useEffect(() => {
        if (authToken) {
        const getData = async () => {
            try {
                const userRespondedData = await fetchUserRespondedJobs(authToken)
                setUserRespondedJobs(userRespondedData);
            } catch (error){
                console.error ("Error fetching user respondedJobs:", error);
            }
        };
        getData()
}}, [authToken]);
    return {userRespondedJobs};
}