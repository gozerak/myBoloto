import "../css/HeaderContent.css";
import "@fontsource/inknut-antiqua";
import { Link } from 'react-router-dom';

function HeaderName () {
    return (
        <p className="header-name">Job Search</p>
    )
}

export function HeaderChapters() {
    return(
        <>
        <Link to="/" className="chapter-executor">
        <div id="for-executor">Исполнителю</div>
        </Link>
        <Link to="/customer" className="chapter-customer">
        <div id="for-customer">Заказчику</div>
        </Link>
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
