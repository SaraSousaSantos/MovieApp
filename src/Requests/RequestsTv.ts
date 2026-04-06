import options from ".././helpers";
import type { ItvSeries } from "../types/tvSeries";

export type ITvSeriesProps = { results: ItvSeries[] };

export const fetchTvSeries = async (
  endpoint: string,
): Promise<ITvSeriesProps> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${endpoint}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular TV series");
  }

  const data: ITvSeriesProps = await response.json();

  return data;
};

export const searchTvSeries = async (
  query: string,
): Promise<ITvSeriesProps> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to search TV shows with query: ${query}`);
  }

  const data: ITvSeriesProps = await response.json();
  return data;
};

export const fetchTvSeriesByGenre = async (
  genre: number,
): Promise<ITvSeriesProps> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?with_genres=${genre}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch TV series by genre");
  }

  const data: ITvSeriesProps = await response.json();
  return data;
};
