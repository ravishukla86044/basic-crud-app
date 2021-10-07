import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Bottom from "./Components/Bottom";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="App">
      <Header />
      <Bottom page={page} setPage={setPage} />
    </div>
  );
}

export default App;
