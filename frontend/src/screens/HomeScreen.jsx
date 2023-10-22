import styles from "../styles/HomeScreen.module.css";
import SideNavbar from "../components/SideNavbar";

const HomeScreen = () => {
  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar home />
      </div>
    </>
  );
};

export default HomeScreen;
