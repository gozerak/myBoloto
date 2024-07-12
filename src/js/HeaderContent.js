import "../css/HeaderContent.css";
import "@fontsource/inknut-antiqua";
function HeaderName () {
    return (
        <p className="header-name">Job Search</p>
    )
}

function HeaderChapters() {
    return(
        <>
        <p className="chapters" id="for-executor">Исполнителю</p>
        <p className="chapters" id="for-customer">Заказчику</p>
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
