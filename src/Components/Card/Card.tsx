import Star from "../../assets/Star/Star";
import styles from "./Card.module.css";

type CardProps = {
  image: string;
  title: string;
  rating: number;
};

function Card({ image, title, rating }: CardProps) {
  const stars = rating / 2;

  const fullStars = Math.floor(stars);
  const hasHalf = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={styles.Card}>
      <img className={styles.poster} src={image} alt={title} />
      <p className={styles.title}>{title}</p>

      <span className={styles.starRating}>
        {Array.from({ length: fullStars }).map((_, f) => (
          <Star key={`full-${f}`} filled />
        ))}

        {hasHalf && <Star key="half" half />}

        {Array.from({ length: emptyStars }).map((_, e) => (
          <Star key={`empty-${e}`} />
        ))}
      </span>
    </div>
  );
}

export default Card;