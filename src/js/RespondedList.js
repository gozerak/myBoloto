import { useState } from "react";
import "../css/RespondedList.css"
import Modal from "./Modal";
import { API_BASE_URL } from "../services/apiService";

function openList() {
    document.getElementById("card-dropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
  
      var dropdowns = document.getElementsByClassName("dropdown-card-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


  export default function RespondedList({ respondedUsers, isCustomerPage, order }) {
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const handleApprove = async (e, userId, orderId) => {
        e.preventDefault();

        let authToken
        if (localStorage.getItem('userId')) {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ').find(row => row.startsWith('accessToken'));

            if (cookies) {
                authToken= (cookies.split('=')[1]);
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
            } else {
                console.error("Ошибка выполнения запроса:", response.status);
            }
        } catch (error) {
            console.error("При подтверждении произошла ошибка", error);
        }
            closeModal();
    }   
    };

    const handleSpanClick = (user) => {
        setSelectedUser(user);
        setIsCardModalOpen(true);
    };

    const closeModal = () => {
        setIsCardModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="dropdown-container">
            {isCustomerPage ? (
                respondedUsers !== null && Array.isArray(respondedUsers) && respondedUsers.length !== 0 ? (
                    <>
                        <button onClick={openList} className="dropbtn">
                            {`Откликов: ${respondedUsers.length}`}
                        </button>
                        <div id="card-dropdown" className="dropdown-card-content">
                            {respondedUsers.map((user) => (
                                <div key={user.id} className="dropdown-card-item">
                                    <span onClick={() => handleSpanClick(user)}>{user.full_name}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Никто не откликнулся</p>
                )
            ) : (
                <p>Никто не откликнулся</p>
            )}

            {isCardModalOpen && (
                <Modal isOpen={isCardModalOpen} onClose={() =>setIsCardModalOpen(false)}>
                    <div className="modal-approve">
            <p className="delete-question">
                {`Назначить заказ ${order.title} на ${selectedUser.full_name}?`}
                </p>
            <div className="delete-buttons">
            <button type='button' className='respond-btn-back' onClick={() => setIsCardModalOpen(false)}>Отмена</button>
            <button type='button' className='respond-btn-submit' onClick={(e) => handleApprove(e, selectedUser.id, order.id)}>
            Подтвердить
            </button>
            </div>
            </div>
                </Modal>
            )}
        </div>
    );
}