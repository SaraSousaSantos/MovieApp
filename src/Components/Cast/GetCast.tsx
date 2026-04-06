import { useEffect, useState } from "react";
import options from "../../helpers";

import type { CastProps } from "./Cast";
import Cast from "./Cast";
import styles from "./getCast.module.css";

type GetCastProps = {
  id: string | undefined;
  mediaType: MediaType;
};

type MediaType = "movie" | "tv";

function GetCast({ id, mediaType }: GetCastProps) {
  const [cast, setCast] = useState<CastProps[]>([]);
  console.log("cast", cast);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits`,
        options,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Cast");
      }

      const data = await response.json();
  
      setCast(data.cast);
    };
    fetchCast();
  }, [mediaType, id]);

  return (
    <div className={styles.cast}>
      <h1 className={styles.sectionTitle}>Cast</h1>
      <div className={styles.actors}>
        {cast
          .filter((actor) => actor.profile_path)
          .map((actor) => (
            <Cast
              key={actor.id}
              profile_path={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              name={actor.name}
              character={actor.character}
            />
          ))}
      </div>
    </div>
  );
}

export default GetCast;
