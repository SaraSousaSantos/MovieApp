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
import Trending from "../../Components/Trending/Trending";

function TvSeriesPage() {
  const [popularTv, setPopularTv] = useState<ItvSeries[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<ItvSeries[]>([]);
  const [onTheAirTv, setOnTheAirTv] = useState<ItvSeries[]>([]);
  const [airingTodayTv, setAiringTodayTv] = useState<ItvSeries[]>([]);

  const [searchTv, setSearchTv] = useState<string>("");
  const [searchResultsTv, setSearchResultsTv] = useState<ItvSeries[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genreResults, setGenreResults] = useState<ItvSeries[]>([]);

  const [isLoadingTv, setIsLoadingTv] = useState<boolean>(false);

  useEffect(() => {
    const getTvSeries = async () => {
      setIsLoadingTv(true);
      try {
        const popularTV = await fetchTvSeries("popular");
        const topRatedTV = await fetchTvSeries("top_rated");
        const onTheAirTV = await fetchTvSeries("on_the_air");
        const airingTodayTV = await fetchTvSeries("airing_today");

        setPopularTv(popularTV.results);
        setTopRatedTv(topRatedTV.results);
        setOnTheAirTv(onTheAirTV.results);
        setAiringTodayTv(airingTodayTV.results);
      } catch (error) {
        console.error("Error fetching TV series:", error);
      } finally {
        setIsLoadingTv(false);
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

      try {
        const data = await searchTvSeries(searchTv);
        setSearchResultsTv(data.results);
      } catch (error) {
        console.error("Error searching TV series:", error);
        setSearchResultsTv([]);
      }
    };

    getSearchTvSeries();
  }, [searchTv]);

  useEffect(() => {
    const getTvSeriesByGenre = async () => {
      if (selectedGenre === null) {
        setGenreResults([]);
        return;
      }

      try {
        const data = await fetchTvSeriesByGenre(selectedGenre.id);
        setGenreResults(data.results);
      } catch (error) {
        console.error("Error searching TV series by genre:", error);
      }
    };

    getTvSeriesByGenre();
  }, [selectedGenre]);

  if (isLoadingTv) {
    return (
      <div className={styles.loading}>
        <p> Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Trending mediaType="tv" detailsPath="tvSeriesDetailsPage" />

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
              setSelectedGenre(null);
            }}
          />
        </div>
      </div>

      <Genres
        mediaType="tv"
        selectedGenre={selectedGenre}
        onClickedGenre={(genre) => {
          setSelectedGenre(genre);
          setSearchTv("");
        }}
      />

      {searchTv ? (
        <BrowseSection
          sectionTitle="Search Results"
          items={searchResultsTv}
          detailsPath="tvSeriesDetailsPage"
        />
      ) : selectedGenre !== null ? (
        <BrowseSection
          sectionTitle={`${selectedGenre.name} TV Series`}
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
            sectionTitle="On The Air"
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
