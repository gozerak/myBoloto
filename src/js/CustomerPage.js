import Header from "./Header";
import MainCustomerPart from "./MainCustomerPart";
import Search from "./Search";
import '../css/CustomerPage.css'
import { useJobs } from "../hooks/useJobs";
import { useRespondedJobs } from "../hooks/useRespondedJobs";

export default function CustomerPage() {
    const { jobs, loading } = useJobs();
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
            </div>
    )
}