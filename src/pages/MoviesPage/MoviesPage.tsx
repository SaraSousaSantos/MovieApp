import { useEffect, useState } from "react";
import type { Imovie } from "../../types/movie";
import styles from "./moviesPage.module.css";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { fetchMovies, searchMovies } from "../../Requests/RequestsMovies";
import Search from "../../assets/Search/Search";

function MoviesPage() {
  const [popular, setPopular] = useState<Imovie[]>([]);
  const [topRated, setTopRated] = useState<Imovie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Imovie[]>([]);

  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Imovie[]>([]);

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

  useEffect(() => {
    const getSearchMovies = async () => {
      const data = await searchMovies(search);

      setSearchResults(data.results);
    };
    getSearchMovies();
  }, [search]);

  return (
    <>
      <div className={styles.searchArea}>
        <div className={styles.searchBar}>
          <Search className={styles.icon} />
          <input
            type="text"
            placeholder="Search"
            className={styles.search}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>

      {search ? (
        <section className={styles.movies}>
          <h1 className={styles.sectionTitle}>Search Results</h1>
          <div className={styles.moviesCards}>
            {searchResults.map((movie) => (
              <Link to={`/movieDetailsPage/${movie.id}`} key={movie.id}>
                <Button variant="secondary">
                  <Card
                    image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    title={movie.title}
                    rating={movie.vote_average}
                  />
                </Button>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className={styles.movies}>
            <h1 className={styles.sectionTitle}>Popular Movies</h1>
            <div className={styles.moviesCards}>
              {popular.map((movie) => (
                <Link to={`/movieDetailsPage/${movie.id}`} key={movie.id}>
                  <Button variant="secondary">
                    <Card
                      key={movie.id}
                      image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      title={movie.title}
                      rating={movie.vote_average}
                    ></Card>
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
                    <Card
                      key={movie.id}
                      image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      title={movie.title}
                      rating={movie.vote_average}
                    ></Card>
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
                    <Card
                      key={movie.id}
                      image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      title={movie.title}
                      rating={movie.vote_average}
                    ></Card>
                  </Button>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default MoviesPage;
