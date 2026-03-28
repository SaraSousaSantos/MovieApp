import type { Imovie } from "../types/movie";
import options from ".././helpers";

export type ImovieProps = { results: Imovie[] };

export const fetchMovies = async  (endpoint: string): Promise<ImovieProps> => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data: ImovieProps = await response.json();
  console.log("data", data);

  return data;
};
