import { useUserData } from "../hooks/useUserData";
import Header from "./Header";
import "../css/ProfilePage.css";
import { useParams } from "react-router-dom";

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

export default function ProfilePage () {
    const { userId } = useParams();
    const { userData, loading} = useUserData({ userId });

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
            <p className="profile-block-title">Профиль пользователя {userData.full_name}</p>
            <p className="profile-block-title">Основная информация</p>
            <div className="profile-main-info-part">
                <ProfileElem profileTitle={"Фамилия"} profileDescription={userData.user_data.surname} />
                <ProfileElem profileTitle={"Имя"} profileDescription={userData.user_data.name} />
                <ProfileElem profileTitle={"Отчество"} profileDescription={userData.user_data.patronymic} />
                <ProfileElem profileTitle={"Номер телефона"} profileDescription={userData.user_data.phone_number} />
                <ProfileElem profileTitle={"e-mail"} profileDescription={userData.email} />
                <ProfileElem profileTitle={"Город"} profileDescription={userData.user_data.city} />
                <ProfileElem profileTitle={"Дата рождения"} profileDescription={userData.user_data.date_of_birth} />
            </div>
            <p className="profile-block-title">Дополнительная информация</p>
            <div className="profile-additional-info-part">
                <ProfileElem profileTitle={"Гражданство"} profileDescription={userData.user_data.citizenship} />
                <ProfileElem profileTitle={"Паспортные данные"} profileDescription={userData.user_data.passport_data} />
                <ProfileElem profileTitle={"СНИЛС"} profileDescription={userData.user_data.snils} />
                <ProfileElem profileTitle={"Медицинская книжка"} profileDescription={userData.user_data.medical_book} />
                <ProfileElem profileTitle={"Самозанятый"} profileDescription={userData.is_self_employed} />
                <ProfileElem profileTitle={"Образование"} profileDescription={userData.user_data.education} />
                <ProfileElem profileTitle={"Опыт работы"} profileDescription={userData.user_data.work_experience} />
                <ProfileElem profileTitle={"Противопоказания"} profileDescription={userData.user_data.contraindications} />
                <ProfileElem profileTitle={"Языки"} profileDescription={userData.user_data.languages} />
                <ProfileElem profileTitle={"Вид работы"} profileDescription={userData.user_data.activity_type} />
                <ProfileElem profileTitle={"О себе"} profileDescription={userData.user_data.about} />
                <ProfileElem profileTitle={"Водительское удостоверение"} profileDescription={userData.user_data.driver_license} />
            </div>
        </div>
    )
}