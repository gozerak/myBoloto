import Header from "./Header";
import MainCustomerPart from "./MainCustomerPart";
import Search from "./Search";
import '../css/CustomerPage.css'
import { useMyCreatedJobs } from "../hooks/useMyCreatedJobs";
import { useRespondedJobs } from "../hooks/useRespondedJobs";
import Footer from "./Footer";

export default function CustomerPage() {
    const { jobs, loading } = useMyCreatedJobs();
    const {userRespondedJobs} = useRespondedJobs();

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
            <MainCustomerPart jobs={jobs} respondedJobs = {userRespondedJobs} />
            {/* <Footer /> */}
            </div>
    )
}