import { NavLink } from "react-router-dom";

export default function SignUpBtn () {

    return (
        <NavLink to="/registration" ><button className="sign-up">Регистрация</button></NavLink>
    )
}