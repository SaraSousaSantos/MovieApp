import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./browseSection.module.css";
import type { Imovie } from "../../types/movie";
import type { ItvSeries } from "../../types/tvSeries";

type MainProps = {
  sectionTitle: string;
  items:Imovie[] | ItvSeries[];
  detailsPath: string;
};

function BrowseSection({ sectionTitle, items, detailsPath }: MainProps) {
  return (
    <section className={styles.container}>
      <h1 className={styles.sectionTitle}>{sectionTitle}</h1>

      <div className={styles.cards}>
        {items.map((item) => (
          <Link to={`/${detailsPath}/${item.id}`} key={item.id}>
            <Button variant="secondary">
              <Card
                image={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                title={"title" in item ? item.title : item.name}
                rating={item.vote_average}
              />
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BrowseSection;