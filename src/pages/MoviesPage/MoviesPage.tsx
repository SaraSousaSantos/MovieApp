import { useEffect, useState } from "react";
import type { Imovie } from "../../types/movie";

import styles from "./moviesPage.module.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { fetchMovies } from "../../Requests/RequestsMovies";

function MoviesPage() {
  // const [movies, setMovies] = useState<Imovie[]>([]);
  const [popular, setPopular] = useState<Imovie[]>([]);
  const [topRated, setTopRated] = useState<Imovie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Imovie[]>([]);

  console.log("popular/results", popular);
  console.log("topRated/results", topRated);
  console.log("nowPlaying/results", nowPlaying);

  useEffect(() => {
    const getMovies = async () => {
      const popular = await fetchMovies("popular");
      const topRated = await fetchMovies("top_rated");
      const nowPlaying = await fetchMovies("now_playing");

      setPopular(popular.results);
      setTopRated(topRated.results);
      setNowPlaying(nowPlaying.results);
    };
    getMovies();
  }, []);

  return (
    <>
      <section className={styles.movies}>
        <h1 className={styles.sectionTitle}>Popular Movies</h1>
        <div className={styles.moviesCards}>
          {popular.map((movie) => (
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

      <section className={styles.movies}>
        <h1 className={styles.sectionTitle}>Top Rated</h1>
        <div className={styles.moviesCards}>
          {topRated.map((movie) => (
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

      <section className={styles.movies}>
        <h1 className={styles.sectionTitle}>Now Playing</h1>
        <div className={styles.moviesCards}>
          {nowPlaying.map((movie) => (
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
