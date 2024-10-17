import Header from "./Header"
import Search from "./Search"
import UserList from "./UserList"

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