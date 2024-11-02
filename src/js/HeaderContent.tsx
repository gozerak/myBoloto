import React from "react";
import "../css/HeaderContent.css";
import "@fontsource/inknut-antiqua";
import { NavLink } from 'react-router-dom';
import HeaderLogin from "./HeaderLogin";
import ProfileIcon from "./ProfileIcon";
import { useEffect, useState } from "react";
import { fetchUserBalance, UserData } from '../services/apiService';
// import { useCheckJWT } from "../hooks/CheckJWT";
import LoginBtn from "./SignUpBtn";
import Notifications from "./Notifications";
import { useUserData } from "../hooks/useUserData";

function HeaderName() {
    return (
        <p className="header-name">KOMOS JOBHUB</p>
    );
}

function UserBalance() {
    const [userBalance, setUserBalance] = useState(0);

    useEffect(() => {
        const getData = async() => {
        try {
            const userBalanceData = await fetchUserBalance()
            setUserBalance(userBalanceData)
        } catch (error){
            console.error ("Error fetching user balance:", error)
        }
    };
    getData(); 
   }, []);

   return (<div className="user-balance">{userBalance} ₽</div>)

}

function HeaderLogo() {
    return (
        <img src='/img/pic_logo.svg' alt='logo' className="logo" />
    );
}

export function HeaderChapters({userData}:{userData: UserData}) {
    return (
        <>
            {userData.manager_data? "" : (<NavLink to="/" className={({ isActive }) => isActive ? "chapter-executor active-link" : "chapter-executor"}>
                <div id="for-executor">Поиск работы</div>
            </NavLink>)}
            {userData.manager_data?
            <NavLink to="/customer" className={({ isActive }) => isActive ? "chapter-customer active-link" : "chapter-customer"}>
                <div id="for-customer">Мои заказы</div>
            </NavLink> : null}
            {userData.user_data?
            <NavLink to="/myresponses" className={({ isActive }) => isActive? "chapter-myresponses active-link": "chapter-myresponses"}>
                <div id="myresponses">Мои отклики</div>
            </NavLink> : null} 
            {userData.manager_data?
            <NavLink to="/userlist" className={({ isActive }) => isActive ? "chapter-userlist active-link" : "chapter-userlist"}>
                <div id="for-customer">Список работников</div>
            </NavLink> : null}
            {/* {isAuthenticated?
            <NavLink to={`/profile/${userId}`} className={({ isActive }) => isActive? "chapter-profile active-link": "chapter-profile"}>
            <div id="profile-link" >Профиль</div>
            </NavLink> : null} */}
        </>
    );
}

export default function HeaderContent() {
    const [userId, setUserId] = useState('');
    const { userData } = useUserData(userId);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId)
        }
    }, [])

    let emptyUserData = userData === null;
    return (
        <div className={`header-content ${emptyUserData? 'unathorized': ''}`}>
        <div className={"header-logo-and-name"}>
            <HeaderLogo />
            <HeaderName />
            </div>
            {userData? <HeaderChapters userData={userData}/> : null}
            {emptyUserData?  null: <Notifications />}
            {userData?.user_data? <UserBalance/> : null}
            <div className="login-register">
            {emptyUserData? <HeaderLogin /> : <ProfileIcon /> }
            {emptyUserData? <LoginBtn /> : null  }
        </div>
        </div>
    );
}
