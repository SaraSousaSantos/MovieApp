import styles from "./getCast.module.css";

export type CastProps = {
  id?: number;
  name: string;
  profile_path: string;
  character: string;
};

function Cast({ name, profile_path, character }: CastProps) {
  return (
    <div>
      <img src={profile_path} alt={name} className={styles.picture}></img>
      <div className={styles.name}>
        <p>{name}</p>
        <div className={styles.character}>
          <p>{character}</p>
        </div>
      </div>
    </div>
  );
}

export default Cast;
