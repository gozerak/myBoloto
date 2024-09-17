import { useEffect, useState } from "react"
import "../css/Notifications.css"
import { fetchNotifications } from "../services/apiService";

export default function Notifications () {
    const [notifications, setNotifications] = useState({});
    const [listOpened, setListOpened] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const notifData = await fetchNotifications();
                setNotifications(notifData);
            } catch (error) {
                console.error ("Error fetching notifications data: ", error)
            }
        };
        getData();
    }, [])

    return(
        <div className="notifications">
            <img className="notification-img" src="../img/notification.svg" height="26px" width="26px" alt="Уведомления" onClick={() => setListOpened(!listOpened)} />
            {listOpened &&(<div isOpen={listOpened} onClose={() => setListOpened(false)}>
                {   Array.isArray(notifications)? (
                    notifications.map((notification) => (
                        <div key={notification.id} className="notification-elem">
                            <p className="notification-time">{notification.created_at}</p>
                            <p className="notification-info">{notification.notification_data}</p>
                            </div>
                    ))
                ) : (
                    <p>Новых уведомлений нет</p>
                )}
            </div>)}
        </div>
    )
}