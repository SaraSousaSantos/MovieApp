import { useEffect, useState } from "react";
import type { Imovie } from "../types/movie";
import options from "../helpers";
import MovieCard from "../Components/MovieCard";
import styles from "./moviesPage.module.css"

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
        <h2 className={styles.sectionTitle}>Popular Movies</h2>
        <div className={styles.popularMoviesCards}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
            ></MovieCard>
          ))}
        </div>
      </section>
    </>
  );
}

export default MoviesPage;

// Data é um {}. Results é um [] com vários {movie}
// {page: 1, results: Array(20), total_pages: 55783, total_results: 1115641}
