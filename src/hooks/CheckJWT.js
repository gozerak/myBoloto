
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../js/UserContext';

export const useCheckJWT = () => {
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

            fetch(`http://10.14.113.150:8010/auth/check_jwt?jwt=${authToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(authData => {
                if (authData.sub && authData.exp) {
                    // логика успешной проверки JWT
                    setIsVerified(true);
                } else {
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

export const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}