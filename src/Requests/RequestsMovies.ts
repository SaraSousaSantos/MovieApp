import type { Imovie } from "../types/movie";
import options from ".././helpers";

export type ImovieProps = { results: Imovie[] };

export const fetchMovies = async (endpoint: string): Promise<ImovieProps> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${endpoint}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data: ImovieProps = await response.json();
  

  return data;
};

export const searchMovies = async (query: string): Promise<ImovieProps> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to search movies with query: ${query}`);
  }

  const data: ImovieProps = await response.json();
  return data;
};

export const fetchMoviesByGenre = async (
  genre: number,
): Promise<ImovieProps> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies by genre");
  }

  const data: ImovieProps = await response.json();
  return data;
};
