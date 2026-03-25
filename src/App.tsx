import "./App.css";
import { Routes, Route } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import TvSeriesPage from "./pages/TvSeriesPage/TvSeriesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/tvSeriesPage" element={<TvSeriesPage />} />
        <Route path="/MovieDetailsPage" element={<MovieDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
