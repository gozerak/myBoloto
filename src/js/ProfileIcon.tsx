import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import "../css/ProfileIcon.css";
import { NavLink, useNavigate } from "react-router-dom";

//Имя пользователя, выпадающий список Профиль и Выйти
export default function ProfileIcon() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("useContext(UserContext) must be used within a UserProvider");
    }

    const { userData, setUserData } = userContext;
    const userId = localStorage.getItem('userId');

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Логика выхода из системы
        localStorage.removeItem('userId');
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUserData(null);
        navigate("/");
        window.location.reload();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className="user-icon-container" ref={dropdownRef}>
            <div className={`user-icon ${userId? "unauthorized": "" }`} onClick={toggleDropdown}>
                {userData ? userData.login : "Loading..."}
            </div>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <NavLink to={`/profile/${userId}`}><button className="dropdown-item" >Профиль</button></NavLink>
                    <button className="dropdown-item" onClick={handleLogout}>Выйти</button>
                </div>
            )}
        </div>
    );
}
