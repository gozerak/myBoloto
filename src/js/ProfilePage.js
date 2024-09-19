import { useUserData } from "../hooks/useUserData";
import Header from "./Header";
import "../css/ProfilePage.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../services/apiService";


function ProfileElem ({ profileTitle, profileDescription }) {
    return (
        <div className="profile-element">
            <p className="profile-title">{profileTitle}</p>
            {typeof(profileDescription) !== "boolean"? (
            <p className="profile-description">{profileDescription}</p> 
            ) : (
                profileDescription === true? (
                    <p className="profile-description">Да</p>
                ) : (
                    <p className="profile-description">Нет</p>
                )
                )}
        </div>
    )
}

function UserRating ({rating}) {
    const totalStars = 5;

    return (
        <div className="profile-block-rating"> 
            <div className="profile-block-rating-stars">{Array.from({ length: totalStars }, (_, i) => {
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;
        return (
          <div key={i} className="star-wrapper">
            <img src='../img/Empty_star.svg' alt="empty star" className="star-background" />
            <img
              src='../img/Filled_star.svg'
              alt="filled star"
              className="star-fill"
              style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
            />
          </div>
        );
      })}</div>
            <p className="profile-block-rating-title">{rating.toFixed(1)}</p>
        </div>

    )
}

function SelfEmployedWarning(isSelfEmployed, userId) {
    const handleSelfEmployed = async (isSelfEmployed) => {
        if(isSelfEmployed) return;
        try {
            const response = await fetch( `${API_BASE_URL}/user_manager/update_data?user_id=${userId}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isSelfEmployed: true
                })
        });
            if (response.ok) {
                console.log ("Ну теперь-то ты самозанятый, деньги начнешь лопатой грести")
            } else {
                console.error ("Произошла ошибка при попытке сделать пользователя самозанятым")
        }
    } catch (error) {
        console.error ("Error: ", error);
    } finally {
        // window.location.reload()
    }
};

    return ( 
        <>
        <p className="not-self-employed-text">Внимание! У Вас не оформлен статус самозанятого, вы не можете откликаться на работу.<br /> 
            Чтобы зарегистрироваться как самозанятый, кликните по кнопке ниже</p>
        <button className="set-is-employed" onClick={() => handleSelfEmployed()}>Тык</button>    
        </>
        )
}

export default function ProfilePage () {
    const { userId } = useParams();
    const { userData, loading} = useUserData({ userId });
    const [isSelfEmployed, setIsSelfEmployed] = useState(userData.is_self_employed)

    if (loading) {
        return (
            <div className="App">
                <Header />
                <div>Загрузка</div>
            </div>
        )
    }

    return (
        <div className="profile-page">
            <Header />
            {userData.user_data?
            (<>
            <div className="profile-block-title-rating">
            <p className="profile-block-title">Профиль пользователя {userData.full_name}</p> 
            {userData.user_rating?
            <UserRating rating={userData.user_rating} /> : null } 
            </div>
            <p className="profile-block-title">Основная информация</p>
                {!isSelfEmployed? <SelfEmployedWarning isSelfEmployed={userData.is_self_employed} userId= {userId} /> : ""}
            <div className="profile-main-info-part">
                <ProfileElem profileTitle={"Фамилия"} profileDescription={userData.user_data.surname} />
                <ProfileElem profileTitle={"Имя"} profileDescription={userData.user_data.name} />
                <ProfileElem profileTitle={"Отчество"} profileDescription={userData.user_data.patronymic} />
                <ProfileElem profileTitle={"e-mail"} profileDescription={userData.email} />
                <ProfileElem profileTitle={"Номер телефона"} profileDescription={userData.user_data.phone_number} />
                <ProfileElem profileTitle={"Город"} profileDescription={userData.user_data.city} />
                <ProfileElem profileTitle={"Дата рождения"} profileDescription={userData.user_data.date_of_birth} />
            </div>
            <p className="profile-block-title">Дополнительная информация</p>
            <div className="profile-additional-info-part">
                <ProfileElem profileTitle={"Гражданство"} profileDescription={userData.user_data.citizenship} />
                <ProfileElem profileTitle={"Паспортные данные"} profileDescription={userData.user_data.passport_data} />
                <ProfileElem profileTitle={"СНИЛС"} profileDescription={userData.user_data.snils} />
                <ProfileElem profileTitle={"Медицинская книжка"} profileDescription={userData.user_data.medical_book} />
                <ProfileElem profileTitle={"Самозанятый"} profileDescription={userData.is_self_employed} onChange={() => setIsSelfEmployed(userData.is_self_employed)} />
                <ProfileElem profileTitle={"Образование"} profileDescription={userData.user_data.education} />
                <ProfileElem profileTitle={"Опыт работы"} profileDescription={userData.user_data.work_experience} />
                <ProfileElem profileTitle={"Противопоказания"} profileDescription={userData.user_data.contraindications} />
                <ProfileElem profileTitle={"Языки"} profileDescription={userData.user_data.languages} />
                <ProfileElem profileTitle={"Вид работы"} profileDescription={userData.user_data.activity_type} />
                <ProfileElem profileTitle={"О себе"} profileDescription={userData.user_data.about} />
                <ProfileElem profileTitle={"Водительское удостоверение"} profileDescription={userData.user_data.driver_license} />
            </div>
            </>
            ) : (
                <p>При загрузке данных произошла ошибка! (Скорее всего битый пользователь)</p>
            )
        }
        </div>
    )
}