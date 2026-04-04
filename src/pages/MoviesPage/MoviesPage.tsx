import { useEffect, useState } from "react";
import type { Imovie } from "../../types/movie";
import { fetchMovies, searchMovies } from "../../Requests/RequestsMovies";
import Search from "../../assets/Search/Search";
import styles from "../../Components/BrowseSection/browseSection.module.css";
import BrowseSection from "../../Components/BrowseSection/BrowseSection";

function MoviesPage() {
  const [popular, setPopular] = useState<Imovie[]>([]);
  const [topRated, setTopRated] = useState<Imovie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Imovie[]>([]);
  const [upcoming, setUpcoming] = useState<Imovie[]>([]);

  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Imovie[]>([]);

  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoadingMovies(true);
      try {
        const popular = await fetchMovies("popular");
        const topRated = await fetchMovies("top_rated");
        const nowPlaying = await fetchMovies("now_playing");
        const upcoming = await fetchMovies("upcoming");

        setPopular(popular.results);
        setTopRated(topRated.results);
        setNowPlaying(nowPlaying.results);
        setUpcoming(upcoming.results);
      } finally {
        setIsLoadingMovies(false);
      }
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

  if (isLoadingMovies) {
    return (
      <div className={styles.loading}>
        <p> Loading...</p>
      </div>
    );
  }
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
        <BrowseSection
          sectionTitle="Search Results"
          items={searchResults}
          detailsPath="movieDetailsPage"
        />
      ) : (
        <>
          <BrowseSection
            sectionTitle="Popular Movies"
            items={popular}
            detailsPath="movieDetailsPage"
          />

          <BrowseSection
            sectionTitle="Top Rated"
            items={topRated}
            detailsPath="movieDetailsPage"
          />

          <BrowseSection
            sectionTitle="Now Playing"
            items={nowPlaying}
            detailsPath="movieDetailsPage"
          />

          <BrowseSection
            sectionTitle="Upcoming"
            items={upcoming}
            detailsPath="movieDetailsPage"
          />
        </>
      )}
    </>
  );
}

export default MoviesPage;
