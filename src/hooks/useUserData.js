import { useEffect, useState } from "react"
import { fetchUserData } from "../services/apiService";


export const useUserData = ( userId ) => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(userId) {
        const getData = async () => {
            try {
                const userData = await fetchUserData( userId );
                setUserData(userData);
            } catch (error) {
                console.error ("Error fetching data: ", error);
            } finally {
                setLoading (false);
            }
        };
        getData();
    }
    }, [userId]);

    return {userData, loading};
}