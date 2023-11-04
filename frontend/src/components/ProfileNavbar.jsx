import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/ProfileNavbar.module.css";
const ProfileNavbar = ({ dashboard, users }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["navbar"]}>
        <div
          className={styles["navbar__logo"]}
          onClick={() => navigate("/home")}
        >
          <img
            src="/Logo.svg"
            alt="logo"
            className={styles["navbar__logo-img"]}
          />
          <p className={styles["navbar__logo-title"]}>ChronoWrite</p>
        </div>
        <p className={styles["navbar__title"]}>Administration</p>
        <div className={styles["navbar__list"]}>
          <Link
            to="/admin/dashboard"
            className={`${styles["navbar__item"]} ${
              dashboard ? styles["navbar__item--active"] : ""
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className={styles["navbar__item__icon"]}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.33333 3.66667V10.3333M7 6.33333V10.3333M9.66667 9V10.3333M4.2 13H9.8C10.9201 13 11.4802 13 11.908 12.782C12.2843 12.5903 12.5903 12.2843 12.782 11.908C13 11.4802 13 10.9201 13 9.8V4.2C13 3.0799 13 2.51984 12.782 2.09202C12.5903 1.71569 12.2843 1.40973 11.908 1.21799C11.4802 1 10.9201 1 9.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V9.8C1 10.9201 1 11.4802 1.21799 11.908C1.40973 12.2843 1.71569 12.5903 2.09202 12.782C2.51984 13 3.0799 13 4.2 13Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className={styles["navbar__item__text"]}>Dashboard</span>
          </Link>
          <Link
            to="/admin/users"
            className={`${styles["navbar__item"]} ${
              users ? styles["navbar__item--active"] : ""
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className={styles["navbar__item__icon"]}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00023 9C4.88684 9 3.00742 10.0204 1.81089 11.604C1.55336 11.9448 1.4246 12.1152 1.42881 12.3455C1.43207 12.5235 1.5438 12.7479 1.6838 12.8578C1.86502 13 2.11614 13 2.61838 13H11.3821C11.8843 13 12.1354 13 12.3166 12.8578C12.4567 12.7479 12.5684 12.5235 12.5716 12.3455C12.5759 12.1152 12.4471 11.9448 12.1896 11.604C10.993 10.0204 9.11361 9 7.00023 9Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.00023 7C8.65708 7 10.0002 5.65685 10.0002 4C10.0002 2.34315 8.65708 1 7.00023 1C5.34337 1 4.00023 2.34315 4.00023 4C4.00023 5.65685 5.34337 7 7.00023 7Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className={styles["navbar__item__text"]}>Users</span>
          </Link>
          <div
            className={`${styles["navbar__item"]} ${styles["navbar__item--logout"]}`}
          >
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              className={styles["navbar__item__icon"]}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0002 4.33333L14.6668 7M14.6668 7L12.0002 9.66667M14.6668 7H6.00016M10.0002 1.80269C9.15033 1.29218 8.16366 1 7.11127 1C3.9203 1 1.3335 3.68629 1.3335 7C1.3335 10.3137 3.9203 13 7.11127 13C8.16366 13 9.15033 12.7078 10.0002 12.1973"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles["navbar__item__text"]}>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileNavbar;
