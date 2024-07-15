import "../css/HeaderContent.css";
import "@fontsource/inknut-antiqua";
import { NavLink } from 'react-router-dom';

function HeaderName () {
    return (
        <p className="header-name">Job Search</p>
    )
}

export function HeaderChapters() {
    return(
        <>
        <NavLink to="/" className={({ isActive }) => isActive ? "chapter-executor active-link" : "chapter-executor"} >
        <div id="for-executor">Исполнителю</div>
        </NavLink>
        <NavLink to="/customer" className={({ isActive }) => isActive ? "chapter-customer active-link" : "chapter-customer"}>
        <div id="for-customer">Заказчику</div>
        </NavLink>
        </>
    )
}

function HeaderLogin () {
    return (
        <button className="login">Войти</button>
    )
}

export default function HeaderContent() {
    return (
        <>
        <HeaderName />
        <HeaderChapters />
        <HeaderLogin />
        </>   
    )
    
};
