import Header from "./Header";
import "../css/ExecutorPage.css";
import MainPart from "./MainPart";
import Search from "./Search";
import { useJobs } from "../hooks/useJobs";
import { useRespondedJobs } from "../hooks/useRespondedJobs";

export default function ExecutorPage () {
  const { jobs, jobsLength, loading } = useJobs();
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
        <div className="App">
          <Header />
          <Search jobsLength={jobsLength} />
          <MainPart jobs={jobs} respondedJobs = {userRespondedJobs} />
        </div>
      );
}