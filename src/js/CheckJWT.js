import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export function CheckJWT() {
    const { setUserData } = useContext(UserContext);
    const [authData, setAuthData] = useState({})
    let authToken = null;

    if (localStorage.getItem('userId')) {
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));
    
      if (cookies) {
        authToken = cookies.split('=')[1];
      }

    if (authToken === null) {
        //логика что не пустили
        console.error("Необходимо перелогиниться")
        return;
    }

    } 
    fetch(`http://10.14.113.150:8010/auth/check_jwt?jwt=${authToken}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(authData => setAuthData(authData))
    .catch(error => console.error("Error:", error));
    if (authData.sub && authData.exp) {
        //логика что все збс
    }
    else {
        const userLocalId = localStorage.getItem('userId');
        if (userLocalId) {
            localStorage.removeItem('userId');
        }
        deleteCookie ('accessToken')
        setUserData(null)
    }
}

export function deleteCookie(name){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}