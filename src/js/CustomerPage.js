import Header from "./Header";
import MainCustomerPart from "./MainCustomerPart";
import Search from "./Search";
import '../css/CustomerPage.css'
import { useJobs } from "../hooks/useJobs";

export default function CustomerPage() {
    const { jobs, loading } = useJobs();

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
            <MainCustomerPart jobs={jobs} />
            </div>
    )
}