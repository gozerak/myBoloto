import { UserRating } from "./ProfilePage"

function UserListCardElem ({name, content}) {
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

export default function UserListCard (userData) {
    console.log(userData)
    return(
        userData.userData.user_data?
        (<div className="user-list-card">

            <UserListCardElem name={"ФИО"} content={userData.userData.full_name}  />
            <UserListCardElem name={"email"} content={userData.userData.email}  />
            <UserRating rating={userData.userData.user_data.rating? userData.userData.rating : 0} />
            <UserListCardElem name={"Город"} content={userData.userData.user_data.city}  />
            <UserListCardElem name={"Дата рождения"} content={userData.userData.user_data.date_of_birth}  />
            <UserListCardElem name={"Номер телефона"} content={userData.userData.user_data.phone_number}  />
            
        </div>) : ""
    )
}
//