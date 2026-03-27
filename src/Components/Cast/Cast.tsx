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
  return (
    <div>
      <p>{name}</p>
      <img src={profile_path} alt={name}></img>
    </div>
  );
}

export default Cast;
