
import { useState, useContext, useEffect} from 'react';
import { UserContext } from '../js/UserContext';
import { API_BASE_URL } from '../services/apiService';

export const useCheckJWT = (): boolean => {
    const { setUserData } = useContext(UserContext);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        let authToken = null;

        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken = cookies.split('=')[1];
            }

            if (authToken === null) {
                console.error("Необходимо перелогиниться");
                setIsVerified(false);
                return;
            }

            fetch(`${API_BASE_URL}/auth/check_jwt?jwt=${authToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(authData => {
                if (authData.sub && authData.exp) {
                    // логика успешной проверки JWT
                    console.log('JWT прошел проверку!')
                    setIsVerified(true);
                } else {
                    console.error("С проверкой JWT что-то не так")
                    const userLocalId = localStorage.getItem('userId');
                    if (userLocalId) {
                        localStorage.removeItem('userId');
                    }
                    deleteCookie('accessToken');
                    setUserData(null);
                    setIsVerified(false);
                }
            })
            .catch(error => console.error("Error:", error));
            setIsVerified(false);
        } else {
            setIsVerified(false);
        }
    }, [setUserData]);

    return isVerified;
}

export const deleteCookie = (name: string) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}