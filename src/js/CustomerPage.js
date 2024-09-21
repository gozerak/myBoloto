import Header from "./Header";
import MainCustomerPart from "./MainCustomerPart";
import Search from "./Search";
import '../css/CustomerPage.css'
import { useMyCreatedJobs } from "../hooks/useMyCreatedJobs";

export default function CustomerPage() {
    const { jobs, loading } = useMyCreatedJobs();

    if (loading) {
        return (
        <div className="App">
          <Header />
          <Search/>
          <div>Загрузка...</div>;
          </div>
        )
    }

    return (
        <div className="CustomerApp">
            <Header />
            <Search />
            <MainCustomerPart jobs={jobs} refreshOrder={useMyCreatedJobs} />
            {/* <Footer /> */}
            </div>
    )
}