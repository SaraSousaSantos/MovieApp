import { useEffect, useState } from "react";
import type { ItvSeries } from "../../types/tvSeries";
import styles from "../MoviesPage/detailsPage.module.css";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { fetchTvSeries, searchTvSeries } from "../../Requests/RequestsTv";
import Search from "../../assets/Search/Search";

function TvSeriesPage() {
  const [popularTv, setPopularTv] = useState<ItvSeries[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<ItvSeries[]>([]);
  const [onTheAirTv, setOnTheAirTv] = useState<ItvSeries[]>([]);

  const [searchTv, setSearchTv] = useState<string>("");
  const [searchResultsTv, setSearchResultsTv] = useState<ItvSeries[]>([]);

  useEffect(() => {
    const getTvSeries = async () => {
      const popularTV = await fetchTvSeries("popular");
      const topRatedTV = await fetchTvSeries("top_rated");
      const onTheAirTV = await fetchTvSeries("on_the_air");

      setPopularTv(popularTV.results);
      setTopRatedTv(topRatedTV.results);
      setOnTheAirTv(onTheAirTV.results);
    };
    getTvSeries();
  }, []);

  useEffect(() => {
    const getSearchTvSeries = async () => {
      const data = await searchTvSeries(searchTv);

      setSearchResultsTv(data.results);
    };
    getSearchTvSeries();
  }, [searchTv]);

  return (
    <>
      <div className={styles.searchArea}>
        <div className={styles.searchBar}>
          <Search className={styles.icon} />
          <input
            type="text"
            placeholder="Search"
            className={styles.search}
            value={searchTv}
            onChange={(event) => {
              setSearchTv(event.target.value);
            }}
          />
        </div>
      </div>

      {searchTv ? (
        <section className={styles.movies}>
          <h1 className={styles.sectionTitle}>Search Results</h1>
          <div className={styles.moviesCards}>
            {searchResultsTv.map((show) => (
              <Link to={`/tvSeriesDetailsPage/${show.id}`} key={show.id}>
                <Button variant="secondary">
                  <Card
                    image={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                    title={show.name}
                    rating={show.vote_average}
                  />
                </Button>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className={styles.movies}>
            <h1 className={styles.sectionTitle}>Popular TV Series</h1>
            <div className={styles.moviesCards}>
              {popularTv.map((show) => (
                <Link to={`/tvSeriesDetailsPage/${show.id}`} key={show.id}>
                  <Button variant="secondary">
                    <Card
                      key={show.id}
                      image={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                      title={show.name}
                      rating={show.vote_average}
                    ></Card>
                  </Button>
                </Link>
              ))}
            </div>
          </section>
          <section className={styles.movies}>
            <h1 className={styles.sectionTitle}>Top Rated</h1>
            <div className={styles.moviesCards}>
              {topRatedTv.map((show) => (
                <Link to={`/tvSeriesDetailsPage/${show.id}`} key={show.id}>
                  <Button variant="secondary">
                    <Card
                      key={show.id}
                      image={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                      title={show.name}
                      rating={show.vote_average}
                    ></Card>
                  </Button>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.movies}>
            <h1 className={styles.sectionTitle}>On The Air</h1>
            <div className={styles.moviesCards}>
              {onTheAirTv.map((show) => (
                <Link to={`/tvSeriesDetailsPage/${show.id}`} key={show.id}>
                  <Button variant="secondary">
                    <Card
                      key={show.id}
                      image={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                      title={show.name}
                      rating={show.vote_average}
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

export default TvSeriesPage;
