import avatar from "../../assets/avatar.png";
import styles from "./navBar.module.css";
import Search from "../../assets/Search/Search";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.user}>
        <img src={avatar} className={styles.avatar} alt="avatar" />
        <div className={styles.userText}>
          <p>Welcome Back</p>
          <p>User</p>
        </div>
      </div>

      <Link to="/">
        <Button variant="primary">Movies</Button>
      </Link>

       <Link to="/tvSeriesPage">
        <Button variant="primary">TvSeries</Button>
      </Link>

      <div className={styles.searchBar}>
        <Search className={styles.icon} />
        <input type="text" placeholder="search" className={styles.search} />
      </div>
    </div>
  );
}

export default NavBar;
