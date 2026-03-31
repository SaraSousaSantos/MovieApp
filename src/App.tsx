import { Routes, Route } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import TvSeriesPage from "./pages/TvSeriesPage/TvSeriesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import TvSeriesDetailsPage from "./pages/TvSeriesDetailsPage/TvSeriesDetailsPage";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/tvSeriesPage" element={<TvSeriesPage />} />
        <Route path="/MovieDetailsPage" element={<MovieDetailsPage />} />
        <Route
          path="/movieDetailsPage/:movie_id"
          element={<MovieDetailsPage />}
        />
        <Route
          path="/tvSeriesDetailsPage/:series_id"
          element={<TvSeriesDetailsPage />}
        />
      </Routes>
    </>
  );
}

export default App;
