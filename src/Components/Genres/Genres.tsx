import { useEffect, useState } from "react";
import options from "../../helpers";
import Chip from "../Chip/Chip";
import styles from "./genres.module.css";

type GenresProps = {
  mediaType: MediaType;
  selectedGenre: Genre | null;
  onClickedGenre: (genre: Genre | null) => void;
};
type MediaType = "movie" | "tv";

export type Genre = {
  id: number;
  name: string;
};

function Genres({ mediaType, selectedGenre, onClickedGenre }: GenresProps) {
  const [genre, setGenre] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/${mediaType}/list`,
        options,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Genres");
      }

      const data = await response.json();
      setGenre(data.genres);
    };

    fetchGenres();
  }, [mediaType]);

  const mainGenres = [
    "Action",
    "Drama",
    "Comedy",
    "Romance",
    "Adventure",
    "Horror",
    "Animation",
    "Science Fiction",
    "Action & Adventure",
    "Crime",
    "Sci-Fi & Fantasy",
    "News",
    "Documentary",
  ];

  return (
    <div className={styles.genres}>
      <div className={styles.chips}>
        <Chip
          variant="secondary"
          label="All"
          isActive={selectedGenre === null}
          onClick={() => onClickedGenre(null)}
        />

        {genre
          .filter((g) => mainGenres.includes(g.name))
          .map((g) => (
            <Chip
              key={g.id}
              variant="secondary"
              isActive={selectedGenre?.id === g.id}
              label={g.name}
              onClick={() => onClickedGenre(g)}
            />
          ))}
      </div>
    </div>
  );
}

export default Genres;
