import "../css/HeaderContent.css";
import "@fontsource/inknut-antiqua";
import { NavLink } from 'react-router-dom';
import HeaderLogin from "./HeaderLogin";

function HeaderName () {
    return (
        <p className="header-name">KOMOS JOBHUB</p>
    )
}

function HeaderLogo() {
    return (
        <img src='/img/pic_logo.svg' alt='logo' />
    )
}

export function HeaderChapters() {
    return(
        <>
        <NavLink to="/" className={({ isActive }) => isActive ? "chapter-executor active-link" : "chapter-executor"} >
        <div id="for-executor">Поиск работы</div>
        </NavLink>
        <NavLink to="/customer" className={({ isActive }) => isActive ? "chapter-customer active-link" : "chapter-customer"}>
        <div id="for-customer">Мои заказы</div>
        </NavLink>
        </>
    )
}

function ReportProblem() {
    return(
        <p className="report-problem">Сообщить о проблеме</p>
    )
}


export default function HeaderContent() {
    return (
        <>
        <HeaderLogo />
        <HeaderName />
        <HeaderChapters />
        <HeaderLogin />
        <ReportProblem />
        </>   
    )
    
};
