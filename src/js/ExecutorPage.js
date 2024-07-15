import Header from "./Header";
import "../css/ExecutorPage.css";
import MainPart from "./MainPart";
import Search from "./Search";

export default function ExecutorPage () {
    return (
        <div className="App">
          <Header />
          <Search />
          <MainPart />
        </div>
      );
}