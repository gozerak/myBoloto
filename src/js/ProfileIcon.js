import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import "../css/ProfileIcon.css";

export default function ProfileIcon() {
    const { userData, setUserData } = useContext(UserContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Логика выхода из системы
        localStorage.removeItem('userId');
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUserData(null);
        window.location.reload();
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
            <div className="user-icon" onClick={toggleDropdown}>
                {userData ? userData.login : "Loading..."}
            </div>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <button className="dropdown-item">Профиль</button>
                    <button className="dropdown-item" onClick={handleLogout}>Выйти</button>
                </div>
            )}
        </div>
    );
}
