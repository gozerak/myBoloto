import { useEffect, useState } from "react"
import { fetchUserData, UserData } from "../services/apiService";

//получение данных о пользователе, для профиля и тд
export const useUserData = ( userId: string ) => {
    const [userData, setUserData] = useState<UserData | null>(null);
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