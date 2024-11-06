import React from "react"
import { UserRating, formatDate, formatPhoneNumber } from './ProfilePage';
import { UserData } from "../services/apiService";

//Карточка пользователя на странице Список работников 
function UserListCardElem ({name, content}: {
    name: string;
    content: string | number | null | undefined;
}) {
    return (
        <div className="user-list-card-elem">
                <p className="user-list-card-elem-title">
                    {name}
                </p>
                <p className="user-list-card-elem-content">
                    {content}
                </p>
            </div>
    )
}

export default function UserListCard ({userData}: {userData: UserData}) {
    return(
        userData.user_data?
        (<div className="user-list-card">

            <UserListCardElem name={"ФИО"} content={userData.full_name}  />
            <UserListCardElem name={"email"} content={userData.email}  />
            <UserRating rating={userData.user_rating? userData.user_rating : 0} nameOfClass={'user-list-rating-stars'} nameOfTitle={"user-list-block-rating-title"}/>
            <UserListCardElem name={"Город"} content={userData.user_data.city}  />
            <UserListCardElem name={"Дата рождения"} content={formatDate(userData.user_data.date_of_birth)}  />
            <UserListCardElem name={"Номер телефона"} content={formatPhoneNumber(userData.user_data.phone_number)}  />
            
        </div>) : ""
    )
}