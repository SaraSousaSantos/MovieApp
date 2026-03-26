import Chip from "../Chip/Chip";
import styles from "./movieDetails.module.css";

type MovieDetailsProps = {
  backdrop: string | undefined;
  image: string | undefined;
  title: string | undefined;
  adult: boolean | undefined;
  rating: number | undefined;
  overview: string | undefined;
};

function MovieDetails({
  backdrop,
  image,
  title,
  adult,
  rating,
  overview,
}: MovieDetailsProps) {
  return (
    <>
      <div className={styles.hero}>
        <img className={styles.backdrop} src={backdrop} alt={title} />

        <div className={styles.overlayContent}>
          <img className={styles.poster} src={image} alt={title} />
          <p className={styles.title}>{title}</p>
        </div>
      </div>

      <div className={styles.details}>
        {adult && <Chip variant="primary" label="+18" />}
        <Chip variant="primary">⭐ {rating?.toFixed(1)}</Chip>

        <p>{overview}</p>
      </div>
    </>
  );
}

export default MovieDetails;
