import { UserContext } from "./UserContext"
import { useContext } from "react"
import "../css/ProfileIcon.css"

export default function ProfileIcon () {
    const { userData } = useContext(UserContext);
    return (
        <div className="user-icon">{userData? userData.login : "Loading..."}</div>
    )
}