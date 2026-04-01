import { useEffect, useState } from "react";
import options from "../../helpers";

import type { CrewProps } from "./Crew";
import Crew from "./Crew";
import styles from "./getCrew.module.css";

type GetCrewProps = {
  id: string | undefined;
  mediaType: MediaType;
};

type MediaType = "movie" | "tv";

function GetCrew({ id, mediaType }: GetCrewProps) {
  const [crew, setCrew] = useState<CrewProps[]>([]);
  console.log("crew", crew);

  useEffect(() => {
    const fetchCrew = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits`,
        options,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Cast");
      }

      const data = await response.json();
      console.log("data", data);
      setCrew(data.crew);
    };
    fetchCrew();
  }, [mediaType, id]);

  return (
    <div className={styles.crew}>
      <h1>Crew</h1>
      <div className={styles.members}>
        {crew.map((c) => (
            <Crew
              key={c.id}
              name={c.name}
              job={c.job}
            />
          ))}
      </div>
    </div>
  );
}

export default GetCrew;