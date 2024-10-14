import { useUserData } from "../hooks/useUserData";
import Header from "./Header";
import "../css/ProfilePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

export function UserRating ({rating}) {
    const totalStars = 5;

    return (
        <div className="profile-block-rating"> 
            <div className="profile-block-rating-stars">{Array.from({ length: totalStars }, (_, i) => {
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;
        return (
          <div key={i} className="star-wrapper">
            <img src='../img/Empty_Star.svg' alt="empty star" className="star-background" />
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

function SelfEmployedWarning({isSelfEmployed, userId, setIsSelfEmployed}) {
    const handleSelfEmployed = async () => {
        if(isSelfEmployed) return;
        try {
            const response = await fetch( `${API_BASE_URL}/user_manager/update_data`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId,
                    update_data: {
                    is_self_employed: true
                }
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
            setIsSelfEmployed(true)
    }
};

    return ( 
        <>
        <p className="not-self-employed-text">Внимание! У Вас не оформлен статус самозанятого, вы не можете откликаться на работу.<br /> 
            Чтобы зарегистрироваться как самозанятый, кликните по кнопке ниже</p>
        <button className="set-is-employed" onClick={() => handleSelfEmployed ()}>Тык</button>    
        </>
        )
}

export default function ProfilePage () {
    const { userId } = useParams();
    const { userData, loading} = useUserData( userId );
    const [isSelfEmployed, setIsSelfEmployed] = useState(true)

    useEffect(() => {
        if (userData && userData.user_data) {
          setIsSelfEmployed(userData.user_data.is_self_employed);
        }
      }, [userData]);

    if (loading) {
        return (
            <div className="App">
                <Header />
                <div>Загрузка</div>
            </div>
        )
    }

    function formatPassport (passportData) {
        if (passportData) {
        const series= passportData.slice(0,4);
        const number = passportData.slice(4);
        
        return(`${series} ${number}`)
        }
        else return;
    }

    function formatSnils (snils) {
        if (snils) {
            return (`${snils.slice(0,3)}-${snils.slice (3,6)}-${snils.slice(6,9)} ${snils.slice(9)}`)
        }
        else return;
    }

    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}.${month}.${year}`;
      }

    function formatPhoneNumber (phoneNumber) {
        if (phoneNumber.length === 11) {
            const formatted = phoneNumber.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/,
                 '+$1 ($2) $3 $4-$5');
            return formatted;  
        }
        return phoneNumber
    }
    console.log(userData)
    return (
        <div className="profile-page">
            <Header />
            <div className="profile-main">
            {userData.user_data?
            (<>
            <div className="profile-block-title-rating">
            <p className="profile-block-title">Профиль пользователя {userData.full_name}</p> 
            {userData.user_rating?
            <UserRating rating={userData.user_rating} /> : null } 
            </div>
            <p className="profile-block-title">Основная информация</p>
                {!isSelfEmployed? <SelfEmployedWarning isSelfEmployed={userData.user_data.is_self_employed} userId= {userId} setIsSelfEmployed={setIsSelfEmployed} /> : ""}
            <div className="profile-info">
            <div className="profile-main-info-part">
                <ProfileElem profileTitle={"Фамилия"} profileDescription={userData.user_data.surname} />
                <ProfileElem profileTitle={"Имя"} profileDescription={userData.user_data.name} />
                <ProfileElem profileTitle={"Отчество"} profileDescription={userData.user_data.patronymic} />
                <ProfileElem profileTitle={"e-mail"} profileDescription={userData.email} />
                <ProfileElem profileTitle={"Номер телефона"} profileDescription={formatPhoneNumber(userData.user_data.phone_number)} />
                <ProfileElem profileTitle={"Город"} profileDescription={userData.user_data.city} />
                <ProfileElem profileTitle={"Дата рождения"} profileDescription={formatDate(userData.user_data.date_of_birth)} />
            </div>
            <p className="profile-block-title">Дополнительная информация</p>
            <div className="profile-additional-info-part">
                <ProfileElem profileTitle={"Гражданство"} profileDescription={userData.user_data.citizenship} />
                <ProfileElem profileTitle={"Паспортные данные"} profileDescription={formatPassport(userData.user_data.passport_data)} />
                <ProfileElem profileTitle={"СНИЛС"} profileDescription={formatSnils(userData.user_data.snils)} />
                <ProfileElem profileTitle={"Медицинская книжка"} profileDescription={userData.user_data.medical_book} />
                <ProfileElem profileTitle={"Самозанятый"} profileDescription={userData.user_data.is_self_employed} onChange={() => setIsSelfEmployed(userData.user_data.is_self_employed)} />
                <ProfileElem profileTitle={"Образование"} profileDescription={userData.user_data.education} />
                <ProfileElem profileTitle={"Опыт работы"} profileDescription={userData.user_data.work_experience} />
                <ProfileElem profileTitle={"Противопоказания"} profileDescription={userData.user_data.contraindications} />
                <ProfileElem profileTitle={"Языки"} profileDescription={userData.user_data.languages} />
                <ProfileElem profileTitle={"Вид работы"} profileDescription={userData.user_data.activity_type} />
                <ProfileElem profileTitle={"О себе"} profileDescription={userData.user_data.about} />
                <ProfileElem profileTitle={"Водительское удостоверение"} profileDescription={userData.user_data.driver_license} />
            </div>
            </div>
            </>
            ) : (
                userData.manager_data?
                ( <>
            <p className="profile-block-title">Профиль пользователя {userData.full_name}</p>
            <div className="profile-info">
            <div className="profile-main-info-part">
                <ProfileElem profileTitle={"Фамилия"} profileDescription={userData.manager_data.surname} />
                <ProfileElem profileTitle={"Имя"} profileDescription={userData.manager_data.name} />
                <ProfileElem profileTitle={"Отчество"} profileDescription={userData.manager_data.patronymic} />
                <ProfileElem profileTitle={"e-mail"} profileDescription={userData.email} />
                <ProfileElem profileTitle={"Номер телефона"} profileDescription={formatPhoneNumber(userData.manager_data.work_phone)} />
                <ProfileElem profileTitle={"Должность"} profileDescription={userData.manager_data.job_title} />
                {/* <ProfileElem profileTitle={"Город"} profileDescription={userData.user_data.city} /> */}
                {/* <ProfileElem profileTitle={"Дата рождения"} profileDescription={formatDate(userData.user_data.date_of_birth)} /> */}
            </div>
            </div>
            </>
          ) : (
                <p>При загрузке данных произошла ошибка! (Скорее всего битый пользователь)</p>
            )
        )
        }
        </div>
        </div>
    )
}