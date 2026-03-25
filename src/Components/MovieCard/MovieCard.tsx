import styles from "./movieCard.module.css";

type MovieCardProps = {
  image: string;
  title: string;
  rating: number;
};

function MovieCard({ image, title, rating }: MovieCardProps) {
  const stars = Math.round(rating / 2);
  return (
    <div className={styles.movieCard}>
      <img className={styles.poster} src={image} alt={title} />
      <p className={styles.title}>{title}</p>
      <span className={styles.starRating}>{"⭐".repeat(stars)}</span>
    </div>
  );
}

export default MovieCard;
