import React from "react"
import Header from "./Header"
import Search from "./Search"
import UserList from "./UserList"

//Страница Список работников
export default function UserListPage () {
    return (
        <div className="user-list-page">
            <Header />
            <Search />
            <UserList />
            {/* <Footer /> */}
            </div>
    )
}