import Header from "./Header";
import MainCustomerPart from "./MainCustomerPart";
import Search from "./Search";
import '../css/CustomerPage.css'

export default function CustomerPage() {
    return (
        <div className="CustomerApp">
            <Header />
            <Search />
            <MainCustomerPart />
            </div>
    )
}