import styles from "./Card.module.css";

type CardProps = {
  image: string;
  title: string;
  rating: number;
};

function Card({ image, title, rating }: CardProps) {
  const stars = Math.round(rating / 2);
  return (
    <div className={styles.Card}>
      <img className={styles.poster} src={image} alt={title} />
      <p className={styles.title}>{title}</p>
      <span className={styles.starRating}>{"⭐".repeat(stars)}</span>
    </div>
  );
}

export default Card;
