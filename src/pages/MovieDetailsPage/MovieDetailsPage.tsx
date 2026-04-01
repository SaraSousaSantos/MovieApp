import { useEffect, useState } from "react";
import type { Imovie } from "../../types/movie";
import options from "../../helpers";
import { useParams } from "react-router-dom";
import Details from "../../Components/Details/Details";
import GetCast from "../../Components/CastEndCrew/GetCast";
import GetCrew from "../../Components/Crew/GetCrew";

function MovieDetailsPage() {
  const { movie_id } = useParams();
  console.log("params", movie_id);

  const [movie, setMovie] = useState<Imovie | null>(null);
  console.log("movie", movie);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}`,
        options,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Movie Details");
      }

      const data = await response.json();
      console.log("data", data);
      setMovie(data);
    };
    fetchMovies();
  }, [movie_id]);

  return (
    <>
      <Details
        key={movie?.id}
        backdrop={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        image={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        title={movie?.title}
        overview={movie?.overview}
        adult={movie?.adult}
        genres={movie?.genres}
        rating={movie?.vote_average}
        runtime={movie?.runtime}
        release_date={movie?.release_date.slice(0, 4)}
      ></Details>

      <GetCast id={movie_id} mediaType="movie" />
      <GetCrew id={movie_id} mediaType="movie" />
    </>
  );
}

export default MovieDetailsPage;
