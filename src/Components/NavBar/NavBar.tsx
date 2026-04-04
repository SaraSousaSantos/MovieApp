// import avatar from "../../assets/avatar.png";
import styles from "./navBar.module.css";
import Button from "../Button/Button";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();
  return (
    <div className={styles.navBar}>
      <div className={styles.pageButtons}>
        <Link to="/" >
          <Button variant="primary" isActive={location.pathname === "/"}>Movies</Button>
        </Link>

        <Link to="/tvSeriesPage">
          <Button variant="primary" isActive={location.pathname === "/tvSeriesPage"}>TvSeries</Button>
        </Link>
      </div>

     
    </div>
  );
}

export default NavBar;
