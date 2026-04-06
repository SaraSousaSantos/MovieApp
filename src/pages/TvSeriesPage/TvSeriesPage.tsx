import { useEffect, useState } from "react";
import type { ItvSeries } from "../../types/tvSeries";
import {
  fetchTvSeries,
  fetchTvSeriesByGenre,
  searchTvSeries,
} from "../../Requests/RequestsTv";
import Search from "../../Components/Search/Search";
import styles from "../../Components/BrowseSection/browseSection.module.css";
import BrowseSection from "../../Components/BrowseSection/BrowseSection";
import Genres, { type Genre } from "../../Components/Genres/Genres";

function TvSeriesPage() {
  const [popularTv, setPopularTv] = useState<ItvSeries[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<ItvSeries[]>([]);
  const [onTheAirTv, setOnTheAirTv] = useState<ItvSeries[]>([]);
  const [airingTodayTv, setAiringTodayTv] = useState<ItvSeries[]>([]);

  const [searchTv, setSearchTv] = useState<string>("");
  const [searchResultsTv, setSearchResultsTv] = useState<ItvSeries[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genreResults, setGenreResults] = useState<ItvSeries[]>([]);

  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);

  useEffect(() => {
    const getTvSeries = async () => {
      setIsLoadingMovies(true);
      try {
        const popularTV = await fetchTvSeries("popular");
        const topRatedTV = await fetchTvSeries("top_rated");
        const onTheAirTV = await fetchTvSeries("on_the_air");
        const airingTodayTV = await fetchTvSeries("airing_today");

        setPopularTv(popularTV.results);
        setTopRatedTv(topRatedTV.results);
        setOnTheAirTv(onTheAirTV.results);
        setAiringTodayTv(airingTodayTV.results);
      } finally {
        setIsLoadingMovies(false);
      }
    };
    getTvSeries();
  }, []);

  useEffect(() => {
    const getSearchTvSeries = async () => {
      if (!searchTv.trim()) {
        setSearchResultsTv([]);
        return;
      }
      const data = await searchTvSeries(searchTv);

      setSearchResultsTv(data.results);
    };
    getSearchTvSeries();
  }, [searchTv]);

  useEffect(() => {
    const getTvSeriesByGenre = async () => {
      if (selectedGenre === null) {
        setGenreResults([]);
        return;
      }

      const data = await fetchTvSeriesByGenre(selectedGenre.id);

      setGenreResults(data.results);
    };

    getTvSeriesByGenre();
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

      <Genres
        mediaType="tv"
        selectedGenre={selectedGenre}
        onClickedGenre={setSelectedGenre}
      />

      {searchTv ? (
        <BrowseSection
          sectionTitle="Search Results"
          items={searchResultsTv}
          detailsPath="tvSeriesDetailsPage"
        />
      ) : selectedGenre !== null ? (
        <BrowseSection
          sectionTitle={`${selectedGenre?.name} TV Series`}
          items={genreResults}
          detailsPath="tvSeriesDetailsPage"
        />
      ) : (
        <>
          <BrowseSection
            sectionTitle="Popular TV Series"
            items={popularTv}
            detailsPath="tvSeriesDetailsPage"
          />

          <BrowseSection
            sectionTitle="Top Rated"
            items={topRatedTv}
            detailsPath="tvSeriesDetailsPage"
          />

          <BrowseSection
            sectionTitle="Now Playing"
            items={onTheAirTv}
            detailsPath="tvSeriesDetailsPage"
          />

          <BrowseSection
            sectionTitle="Airing Today"
            items={airingTodayTv}
            detailsPath="tvSeriesDetailsPage"
          />
        </>
      )}
    </>
  );
}

export default TvSeriesPage;
