import "./App.css";
import Header from "./Components/Header";
import Bottom from "./Components/Bottom";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Edit from "./Components/Edit";
import Create from "./Components/Create";
import StudentList from "./Components/StudentList";
import Filter from "./Components/Filter";

function App() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState();
  const [filter, setFilter] = useState("");
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <>
            <div style={{ display: "flex" }}>
              <StudentList sorting={sort} pagination={page} setPage={setPage} filtering={filter} />
              <Filter sort={sort} setSort={setSort} filter={filter} setFilter={setFilter} />
            </div>
            <Bottom pagination={page} setPage={setPage} sort={sort} />
          </>
        </Route>
        <Route path="/edit/:id">
          <Edit />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
