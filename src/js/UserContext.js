import React, { createContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/apiService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`${API_BASE_URL}/user_manager/get_user_by_id?user_id=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error:', error));
        }
    }, []);
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
