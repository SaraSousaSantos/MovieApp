import styles from "./getCast.module.css";

export type CastProps = {
  id: number;
  name: string;
  profile_path: string;
 
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
