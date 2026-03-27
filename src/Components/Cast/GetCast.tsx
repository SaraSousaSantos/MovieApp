import { useEffect, useState } from "react";
import options from "../../helpers";
import { useParams } from "react-router-dom";
import type { CastProps } from "./Cast";
import Cast from "./Cast";
import styles from "./getCast.module.css";

function GetCast() {
  const { movie_id } = useParams();
  console.log("params", movie_id);

  const [cast, setCast] = useState<CastProps[]>([]);
  console.log("cast", cast);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
        options,
      );
      const data = await response.json();
      console.log("data", data);
      setCast(data.cast);
    };
    fetchCast();
  }, [movie_id]);

  return (
    <div className={styles.cast}>
      <h1>Cast</h1>
      <div className={styles.cast}>
        {cast.map((actor) => (
          <Cast
            name={actor.name}
            profile_path={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
          />
        ))}
      </div>
    </div>
  );
}

export default GetCast;
