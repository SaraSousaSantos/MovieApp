import { useEffect, useState } from "react";
import type { ItvSeries } from "../../types/tvSeries";
import options from "../../helpers";
import { useParams } from "react-router-dom";
import Details from "../../Components/Details/Details";
import GetCast from "../../Components/Cast/GetCast";


function TvSeriesDetailsPage() {
  const { series_id } = useParams();
  console.log("params", series_id);

  const [show, setShow] = useState<ItvSeries | null>(null);
  console.log("show", show);

  useEffect(() => {
    const fetchTvSeries = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${series_id}`,
        options,
      );
      const data = await response.json();
      console.log("data", data);
      setShow(data);
    };
    fetchTvSeries();
  }, [series_id]);

  return (
    <>
      <Details
        key={show?.id}
        backdrop={`https://image.tmdb.org/t/p/original${show?.backdrop_path}`}
        image={`https://image.tmdb.org/t/p/w500${show?.poster_path}`}
        name={show?.name}
        overview={show?.overview}
        adult={show?.adult}
        genres={show?.genres}
        rating={show?.vote_average}
      ></Details>

      <GetCast
        id={series_id}
        mediaType="tv"
      />
    </>
  );
}

export default TvSeriesDetailsPage;