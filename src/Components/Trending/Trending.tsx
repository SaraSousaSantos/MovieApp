import { useEffect, useState } from "react";
import options from "../../helpers";
import styles from "./trending.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

type TrendingProps = {
  mediaType: MediaType;
  detailsPath: string;
};

type MediaType = "movie" | "tv";

type TrendingItem = {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string | null;
};

function Trending({ mediaType, detailsPath }: TrendingProps) {
  const [trending, setTrending] = useState<TrendingItem[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/${mediaType}/day`,
        options,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Trending");
      }

      const data = await response.json();
      setTrending(data.results);
    };
    fetchTrending();
  }, [mediaType]);

  const totalPages = Math.floor(trending.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const visibleItems = trending.slice(startIndex, startIndex + itemsPerPage);

  const handleDotClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>
          {mediaType === "movie" ? "Trending Movies" : "Trending TV Shows"}
        </h1>
        <div className={styles.trending}>
          {visibleItems.map((item) => (
            <Link to={`/${detailsPath}/${item.id}`} key={item.id}>
              <Button variant="secondary">
                <div key={item.id} className={styles.trendingCard}>
                  <img
                    className={styles.trendingImage}
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    alt={item.title || item.name}
                  />
                  <h3 className={styles.trendingTitle}>
                    {item.title || item.name}
                  </h3>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.indicators}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentPage === index ? styles.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </>
  );
}

export default Trending;
