import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviesPage" element={<MoviesPage />} />
      </Routes>
    </>
  );
}

export default App;
