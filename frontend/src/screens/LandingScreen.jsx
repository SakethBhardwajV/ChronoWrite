import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import screen from "../styles/LandingPage.module.css";
import styles from "../styles/LandingNavbar.module.css";

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <ul className={styles["navbar"]}>
        <img
          src="/logo-with-text.svg"
          alt="logo"
          className={styles["navbar__logo"]}
        />

        <input
          type="checkbox"
          id="navi-toggle"
          className={styles["navbar__checkbox"]}
        />
        <label htmlFor="navi-toggle" className={styles["navbar__button"]}>
          <span className={styles["navbar__icon"]}>&nbsp;</span>
        </label>

        <div className={styles["navbar__list"]}>
          <label
            htmlFor="navi-toggle"
            className={`${styles["navbar__button"]} ${styles["navbar__button--close"]}`}
          >
            <span className={styles["navbar__icon"]}>&nbsp;</span>
          </label>

          <Link to="/" className={styles["navbar__item"]}>
            support
          </Link>
          <Link to="/about" className={styles["navbar__item"]}>
            about
          </Link>
          <Link to="/login" className={styles["navbar__item"]}>
            log in
          </Link>
        </div>
      </ul>
      <main className={screen["container"]}>
        <div className={screen["container__left"]}>
          <div className={screen["text-container"]}>
            <h1 className={screen["primary-heading"]}>
              Where words stand the test of time.
            </h1>
            <p className={screen["text"]}>
              A platform where posting your experiences is way more fun. Build
              with React, MongoDB, Express and Node!
            </p>
            <div className={screen["btn-container"]}>
              <Button varient="primary" onClick={() => navigate("/register")}>
                Get Started
              </Button>
              <Button varient="tertiary" onClick={() => navigate("/support")}>
                Support
              </Button>
            </div>
          </div>
        </div>
        <div className={screen["container__right"]}>
          <img
            src="/landing.svg"
            alt="landing image"
            className={screen["img"]}
          />
        </div>
      </main>
    </>
  );
};

export default LandingScreen;
