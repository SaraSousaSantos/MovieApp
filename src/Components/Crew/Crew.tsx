import styles from "./getCrew.module.css";

export type CrewProps = {
  id?: number;
  name: string;
  job: string;
  
};

function Crew({ name, job }: CrewProps) {
  return (
    <div>
      
      <div className={styles.name}>
        <p>{name}</p>
        <div className={styles.job}>
          <p>{job}</p>
        </div>
      </div>
    </div>
  );
}

export default Crew;