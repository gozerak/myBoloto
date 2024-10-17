import { useState, useEffect, useRef } from "react";
import "../css/RespondedList.css";
import Modal from "./Modal";
import { API_BASE_URL } from "../services/apiService";
import { NavLink } from "react-router-dom";
import TemporaryNotifier from "./TemporaryNotifier";

export default function RespondedList({ respondedUsers, isCustomerPage, order, refreshOrder }) {
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Убираем начальное значение пустого объекта
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Управляем открытием списка
    const dropdownRef = useRef(null); // Реф для выпадающего списка
    const [comment, setComment] = useState('')
    const [showNotifier, setShowNotifier] = useState(false);
    const [notifierStatus, setNotifierStatus] = useState('');
    const [notifierText, setNotifierText] = useState('')

    const handleApprove = async (e, userId, orderId) => {
        e.preventDefault();

        let authToken;
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken = cookies.split('=')[1];
            } else {
                console.error("Необходимо перелогиниться");
            }

            try {
                const response = await fetch(`${API_BASE_URL}/jobs/accept_responded_user?user_id=${userId}&job_id=${orderId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`
                    }
                });

                if (response.ok) {
                    console.log("Запрос выполнен успешно, статус:", response.status);
                    setNotifierStatus('success')
                    setNotifierText('Вы успешно назначили работу!')
                    setShowNotifier(true)
                    setTimeout(() => {
                        setShowNotifier(false);
                    }, 5000)
                    if (comment) {
                        sendComment (userId)
                    }
                    else {
                        closeModal();
                        refreshOrder(); 
                    }

                } else {
                    console.error("Ошибка выполнения запроса:", response.status);
                }
            } catch (error) {
                console.error("При подтверждении произошла ошибка", error);
                setNotifierStatus('error')
                setNotifierText('При подтверждении произошла ошибка')
                setShowNotifier(true)
                setTimeout(() => {
                    setShowNotifier(false);
                }, 5000)
            }
        }   
    };

    const sendComment = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/notif/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   notification_data: comment,
                   user_id: userId 
                })
            });

            if (response.ok) {
                console.log("Запрос выполнен успешно, статус:", response.status);

            } else {
                console.error("Ошибка выполнения запроса:", response.status);
            }
        } catch (error) {
                console.error("При отправке комментария ошибка", error);
            }
        closeModal();  
    }

    const handleSpanClick = (user) => {
        setSelectedUser(user); // Устанавливаем выбранного пользователя
        setIsCardModalOpen(true); // Открываем модальное окно
    };

    const closeModal = () => {
        setIsCardModalOpen(false); // Закрываем модальное окно
        setSelectedUser(null); // Сбрасываем выбранного пользователя
    };

    // Обработчик клика за пределами dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false); // Закрываем список, если клик вне его области
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className="dropdown-container">
            {showNotifier? <TemporaryNotifier status={notifierStatus} text={notifierText} />: null}
            {isCustomerPage ? (
                respondedUsers !== null && Array.isArray(respondedUsers) && respondedUsers.length !== 0 ? (
                    <>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dropbtn">
                            {`Откликов: ${respondedUsers.length}`}
                        </button>
                        {isDropdownOpen && (
                            <div id="card-dropdown" className="dropdown-card-content" ref={dropdownRef}>
                                {respondedUsers.map((user) => (
                                    <div key={user.id} className="dropdown-card-item" onClick={() => handleSpanClick(user)}>
                                        <span>{user.full_name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <p>Никто не откликнулся</p>
                )
            ) : (
                <p>Никто не откликнулся</p>
            )}

            {isCardModalOpen && selectedUser && ( // Модальное окно рендерится отдельно
                <Modal isOpen={isCardModalOpen} onClose={closeModal}>
                    <div className="delete-modal">
                        <p className="delete-question">{`Выберите действие для ${selectedUser.full_name || selectedUser.login}`}</p>
                        <div className="respond-modal-comment">
                            <p>Комментарий для работника:</p>
                            <input 
                            className="respond-modal-input" 
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} />
                        </div>
                        <div className="delete-buttons">
                            <NavLink 
                            to={`/profile/${selectedUser.id}`}
                            // target="_blank"
                            // rel="noopener noreferrer"
                            >
                                <button className="respond-btn-profile">Профиль</button>
                            </NavLink>
                            <button
                                type="submit"
                                className="respond-btn-submit"
                                onClick={(e) => handleApprove(e, selectedUser.id, order.job.id)}
                            >
                                Подтвердить выбор
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
