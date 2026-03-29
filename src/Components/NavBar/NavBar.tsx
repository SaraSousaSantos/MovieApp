// import avatar from "../../assets/avatar.png";
import styles from "./navBar.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.pageButtons}>
        <Link to="/">
          <Button variant="primary">Movies</Button>
        </Link>

        <Link to="/tvSeriesPage">
          <Button variant="primary">TvSeries</Button>
        </Link>
      </div>

     
    </div>
  );
}

export default NavBar;
