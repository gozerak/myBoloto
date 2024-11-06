import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL, UserData } from '../services/apiService';

//для получения данных о пользователе, например в useCheckJWT
interface UserContextType {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  }

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

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
