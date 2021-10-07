import "./App.css";
import Header from "./Components/Header";
import Bottom from "./Components/Bottom";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Edit from "./Components/Edit";
import Create from "./Components/Create";
import StudentList from "./Components/StudentList";

function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <StudentList page={page} setPage={setPage} />
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
