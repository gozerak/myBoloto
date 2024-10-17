import Header from "./Header";
import Search from "./Search";
// import MainCustomerPart from "./MainCustomerPart";
import MainMyResponsesPart from "./MainMyResponsesPart";
import { useRespondedJobs } from "../hooks/useRespondedJobs";

export default function MyResponsesPage () {
    const {userRespondedJobs} = useRespondedJobs();
    return (
        <div className="App">
        <Header/>
        <Search />
        <MainMyResponsesPart jobs = {userRespondedJobs} />
        </div>
    )
}