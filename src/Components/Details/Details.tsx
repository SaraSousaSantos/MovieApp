import Chip from "../Chip/Chip";
import styles from "./Details.module.css";

type DetailsProps = {
  backdrop: string | undefined;
  image: string | undefined;
  title?: string | undefined;
  adult: boolean | undefined;
  genres: genre[] | undefined;
  rating: number | undefined;
  overview: string | undefined;
  name?: string | undefined;
};

type genre = {
  id: number;
  name: string;
};

function Details({
  backdrop,
  image,
  title,
  adult,
  genres,
  rating,
  name,

  overview,
}: DetailsProps) {
  const displayTitle = title || name;

  return (
    <>
      <div className={styles.hero}>
        <img className={styles.backdrop} src={backdrop} alt={displayTitle} />

        <div className={styles.overlayContent}>
          <img className={styles.poster} src={image} alt={displayTitle} />
          <h1 className={styles.title}>{displayTitle}</h1>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.chips}>
          {adult && <Chip variant="primary" label="+18" />}

          {genres?.map((genre) => (
            <Chip key={genre.id} variant="primary">
              {genre.name}
            </Chip>
          ))}
          <Chip variant="primary">⭐ {rating?.toFixed(1)}</Chip>
        </div>

        <h1 className={styles.title}>Overview</h1>
        <p className={styles.text}>{overview}</p>
      </div>
    </>
  );
}

export default Details;
