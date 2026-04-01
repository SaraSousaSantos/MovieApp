import Star from "../../assets/Star/Star";
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
  release_date?: string | undefined;

  runtime?: number | null | undefined;
  episode_run_time?: number[] | undefined;
};
type genre = {
  id: number;
  name: string;
};

function formatRuntime(runtime: number | null | undefined): string {
  if (!runtime) return "—";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function formatEpisodeRuntime(
  episode_run_time: number[] | null | undefined,
): string {
  if (!episode_run_time|| episode_run_time.length === 0) return "—";

const totalMinutes = episode_run_time[0];
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function Details({
  backdrop,
  image,
  title,
  adult,
  genres,
  rating,
  name,
  release_date,
  runtime,
  episode_run_time,
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
          <Chip variant="primary">
            <Star key={"full"} filled />
            {rating?.toFixed(1)}
          </Chip>
          <Chip variant="primary">{release_date}</Chip>

          <Chip variant="primary">
            {runtime
              ? formatRuntime(runtime)
              : formatEpisodeRuntime(episode_run_time)}
          </Chip>
        </div>

        <h1 className={styles.title}>Overview</h1>
        <p className={styles.text}>{overview}</p>
      </div>
    </>
  );
}

export default Details;
