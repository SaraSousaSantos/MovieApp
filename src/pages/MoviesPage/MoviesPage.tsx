import { useEffect, useState } from "react";
import type { Imovie } from "../../types/movie";
import {
  fetchMovies,
  searchMovies,
  fetchMoviesByGenre,
} from "../../Requests/RequestsMovies";
import Search from "../../Components/Search/Search";
import styles from "../../Components/BrowseSection/browseSection.module.css";
import BrowseSection from "../../Components/BrowseSection/BrowseSection";
import Genres, { type Genre } from "../../Components/Genres/Genres";
import Trending from "../../Components/Trending/Trending";

function MoviesPage() {
  const [popular, setPopular] = useState<Imovie[]>([]);
  const [topRated, setTopRated] = useState<Imovie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Imovie[]>([]);
  const [upcoming, setUpcoming] = useState<Imovie[]>([]);

  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Imovie[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genreResults, setGenreResults] = useState<Imovie[]>([]);

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
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }

      const data = await searchMovies(search);

      setSearchResults(data.results);
    };
    getSearchMovies();
  }, [search]);

  useEffect(() => {
    const getMoviesByGenre = async () => {
      if (selectedGenre === null) {
        setGenreResults([]);
        return;
      }
      const data = await fetchMoviesByGenre(selectedGenre.id);
      setGenreResults(data.results);
    };

    getMoviesByGenre();
  }, [selectedGenre]);

  if (isLoadingMovies) {
    return (
      <div className={styles.loading}>
        <p> Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Trending mediaType="movie" detailsPath="movieDetailsPage" />

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

      <Genres
        mediaType="movie"
        selectedGenre={selectedGenre}
        onClickedGenre={setSelectedGenre}
      />

      {search ? (
        <BrowseSection
          sectionTitle="Search Results"
          items={searchResults}
          detailsPath="movieDetailsPage"
        />
      ) : selectedGenre !== null ? (
        <BrowseSection
          sectionTitle={`${selectedGenre?.name} Movies`}
          items={genreResults}
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
