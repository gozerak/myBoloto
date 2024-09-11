import "../css/HeaderContent.css";
import "@fontsource/inknut-antiqua";
import { NavLink } from 'react-router-dom';
import HeaderLogin from "./HeaderLogin";
import ProfileIcon from "./ProfileIcon";
import { useEffect, useState } from "react";
import { fetchUserBalance } from "../services/apiService";

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

   return (<div className="user-balance">{userBalance}₽</div>)

}

function HeaderLogo() {
    return (
        <img src='/img/pic_logo.svg' alt='logo' />
    );
}

export function HeaderChapters() {
    return (
        <>
            <NavLink to="/" className={({ isActive }) => isActive ? "chapter-executor active-link" : "chapter-executor"}>
                <div id="for-executor">Поиск работы</div>
            </NavLink>
            <NavLink to="/customer" className={({ isActive }) => isActive ? "chapter-customer active-link" : "chapter-customer"}>
                <div id="for-customer">Мои заказы</div>
            </NavLink>
        </>
    );
}

function ReportProblem() {
    return (
        <p className="report-problem">Сообщить о проблеме</p>
    );
}

export default function HeaderContent() {
    let accessToken = null;

    if (localStorage.getItem('userId')) {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

        if (cookies) {
            accessToken = cookies.split('=')[1];
        }
    }

    return (
        <>
            <HeaderLogo />
            <HeaderName />
            <HeaderChapters />
            <UserBalance/>
            {accessToken ? <ProfileIcon /> : <HeaderLogin />}
            <ReportProblem />
        </>
    );
}
