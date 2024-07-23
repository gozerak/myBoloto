import "../css/HeaderContent.css";
import "@fontsource/inknut-antiqua";
import { NavLink } from 'react-router-dom';
import HeaderLogin from "./HeaderLogin";
import ProfileIcon from "./ProfileIcon";

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
        <HeaderName />
        <HeaderChapters />
        {accessToken? <ProfileIcon /> : <HeaderLogin />}
        </>   
    )
    
};
