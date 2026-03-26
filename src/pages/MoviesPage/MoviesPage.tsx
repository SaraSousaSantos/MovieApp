import { useEffect, useState } from "react";
import type { Imovie } from "../../types/movie";
import options from "../../helpers";
import styles from "./moviesPage.module.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";

function MoviesPage() {
  const [movies, setMovies] = useState<Imovie[]>([]);
  console.log("movies/results", movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular`,
        options,
      );
      const data = await response.json();
      console.log("data", data);
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <section className={styles.popularMovies}>
        <h1 className={styles.sectionTitle}>Popular Movies</h1>
        <div className={styles.popularMoviesCards}>
          {movies.map((movie) => (
            <Link to={`/movieDetailsPage/${movie.id}`} key={movie.id}>
              <Button variant="secondary">
                <MovieCard
                  key={movie.id}
                  image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  title={movie.title}
                  rating={movie.vote_average}
                ></MovieCard>
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default MoviesPage;

// Data é um {}. Results é um [] com vários {movie}
// {page: 1, results: Array(20), total_pages: 55783, total_results: 1115641}
