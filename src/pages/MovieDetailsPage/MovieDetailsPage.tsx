import { useEffect, useState } from "react";
import type { Imovie } from "../../types/movie";
import options from "../../helpers";
import { useParams } from "react-router-dom";
import MovieDetails from "../../Components/MovieDetails/MovieDetails";

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
      const data = await response.json();
      console.log("data", data);
      setMovie(data);
    };
    fetchMovies();
  }, [movie_id]);

  return (
    <MovieDetails
      key={movie?.id}
      backdrop={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
      image={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
      title={movie?.title}
      overview={movie?.overview}
      adult={movie?.adult}
      rating={movie?.vote_average}
    ></MovieDetails>
  );
}

export default MovieDetailsPage;
