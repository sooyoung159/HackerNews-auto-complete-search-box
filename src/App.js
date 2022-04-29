import logo from "./logo.svg";
import "./App.css";
import SearchBox from "./components/SearchBox";
import { Route, Routes } from "react-router";
import Searched from "./components/Searched";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchBox />} />
      <Route path="/:id" element={<Searched />} />
    </Routes>
  );
}

export default App;
