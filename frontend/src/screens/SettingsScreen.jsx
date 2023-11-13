import SideNavbar from "../components/SideNavbar";
import styles from "../styles/SettingsScreen.module.css";

const SettingsScreen = () => {
  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar settings />
        <main className={styles["main"]}>
          <p className={styles["main__title"]}>Work in progress</p>
        </main>
      </div>
    </>
  );
};

export default SettingsScreen;
