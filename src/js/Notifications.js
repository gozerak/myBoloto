import { useEffect, useState } from "react"
import "../css/Notifications.css"
import { API_BASE_URL, fetchNotifications } from "../services/apiService";

export default function Notifications () {
    const [notifications, setNotifications] = useState([]);
    const [listOpened, setListOpened] = useState(false);
    const [openedNotificationId, setOpenedNotificationId] = useState(null);

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

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        // Форматирование в нужный вид
        const formattedDate = date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
        });
        return formattedDate;

    }

    const handleNotificationClick = (id) => {
        if (openedNotificationId === id) {
            setOpenedNotificationId(null)
        } else {
        setOpenedNotificationId(id);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/notif/mark_as_read`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    notifications: [id],
                }),
            });
            
            if (response.ok) {
                console.log("Уведомление успешно удалено");
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notif) => notif.id !== id)
                  );
                setOpenedNotificationId(null); // Скрываем кнопку после прочтения
            } else {
                
                console.error("Ошибка при удалении уведомления")
            }
                } catch (error) {
                console.error("Error: ", error)
            }
        }

        const handleCloseList = (isListOpened) => {
            setOpenedNotificationId(null)
            setListOpened(isListOpened) 
        }
        


    return(
        <div className="notifications">
            <img className="notification-img" src="../img/notification.svg" height="26px" width="26px" alt="Уведомления" onClick={() => handleCloseList(!listOpened)} />
            {listOpened && (
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={
                  openedNotificationId === notification.id
                    ? "notification-elem-active"
                    : "notification-elem"
                }
                onClick={() => handleNotificationClick(notification.id)}
              >
                <p className="notification-time">
                  {formatDate(notification.created_at)}
                </p>
                <p className="notification-info">
                  {notification.notification_data}
                </p>
                {openedNotificationId === notification.id && (
                  <button
                    className="mark-as-read-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Останавливаем всплытие события
                      handleMarkAsRead(notification.id);
                    }}
                  >
                    Прочтено
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="no-notifications">Нет новых уведомлений</p>
          )}
        </div>
      )}
    </div>
  );
}