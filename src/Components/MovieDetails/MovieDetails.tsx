import Chip from "../Chip/Chip";
import styles from "./movieDetails.module.css";

type MovieDetailsProps = {
  backdrop: string | undefined;
  image: string | undefined;
  title: string | undefined;
  adult: boolean | undefined;
  genres: genre[] | undefined;
  rating: number | undefined;
  overview: string | undefined;
};

type genre = {
  id: number;
  name: string;
};

function MovieDetails({
  backdrop,
  image,
  title,
  adult,
  genres,
  rating,

  overview,
}: MovieDetailsProps) {
  return (
    <>
      <div className={styles.hero}>
        <img className={styles.backdrop} src={backdrop} alt={title} />

        <div className={styles.overlayContent}>
          <img className={styles.poster} src={image} alt={title} />
          <h1 className={styles.title}>{title}</h1>
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
        <h1>Overview</h1>
        <p>{overview}</p>
      </div>
    </>
  );
}

export default MovieDetails;
