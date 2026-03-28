import styles from "./getCast.module.css";

export type CastProps = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type IcastCard = Pick<CastProps, "name" | "profile_path">;

function Cast({ name, profile_path }: IcastCard) {
  // if (!profile_path) return null;
  return (
    <div>
      <img src={profile_path} alt={name} className={styles.picture}></img>
      <p>{name}</p>
    </div>
  );
}

export default Cast;
