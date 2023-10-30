import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/SideNavbar.module.css";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";

const SideNavbar = ({ home, settings, likes, bookmarks, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul className={styles["navbar"]}>
      <img src="/Logo.svg" alt="logo" className={styles["navbar__logo"]} />
      <div className={styles["navbar__list"]}>
        <Link to="/home" className={styles["navbar__item"]}>
          <span className={styles["navbar__text"]}>Home</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`${styles["navbar__icon"]} ${
              home ? styles["navbar__icon--active"] : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 10.9384C2.5 9.71422 3.06058 8.55744 4.02142 7.79888L9.52142 3.45677C10.9747 2.30948 13.0253 2.30948 14.4786 3.45677L19.9786 7.79888C20.9394 8.55744 21.5 9.71422 21.5 10.9384V17.5C21.5 19.7091 19.7091 21.5 17.5 21.5H16C15.4477 21.5 15 21.0523 15 20.5V17.5C15 16.3954 14.1046 15.5 13 15.5H11C9.89543 15.5 9 16.3954 9 17.5V20.5C9 21.0523 8.55228 21.5 8 21.5H6.5C4.29086 21.5 2.5 19.7091 2.5 17.5L2.5 10.9384Z"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
        <Link to="/likes" className={styles["navbar__item"]}>
          <span className={styles["navbar__text"]}>Likes</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles["navbar__icon"]} ${
              likes ? styles["navbar__icon--active"] : ""
            }`}
          >
            <path
              d="M3.66276 13.2135L9.82378 19.7065C11.0068 20.9532 12.9933 20.9532 14.1762 19.7065L20.3373 13.2135C22.5543 10.877 22.5543 7.08882 20.3373 4.75235C18.1203 2.41588 14.5258 2.41588 12.3088 4.75235V4.75235C12.1409 4.92925 11.8591 4.92925 11.6912 4.75235V4.75235C9.47422 2.41588 5.87976 2.41588 3.66276 4.75235C1.44576 7.08883 1.44576 10.877 3.66276 13.2135Z"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
        <Link to="/bookmarks" className={styles["navbar__item"]}>
          <span className={styles["navbar__text"]}>Bookmarks</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`${styles["navbar__icon"]} ${
              bookmarks ? styles["navbar__icon--active"] : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
        {/* <Link to="/profile" className={styles["navbar__item"]}> */}
        <div className={styles["navbar__item"]} onClick={handleLogout}>
          <span className={styles["navbar__text"]}>Logout</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`${styles["navbar__icon"]} ${
              profile ? styles["navbar__icon--active"] : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="4"
              cy="4"
              r="4"
              transform="matrix(-1 0 0 1 16 3)"
              strokeWidth="1.5"
            />
            <path
              d="M5 16.9347C5 16.0743 5.54085 15.3068 6.35109 15.0175V15.0175C10.004 13.7128 13.996 13.7128 17.6489 15.0175V15.0175C18.4591 15.3068 19 16.0743 19 16.9347V18.2502C19 19.4376 17.9483 20.3498 16.7728 20.1818L15.8184 20.0455C13.2856 19.6837 10.7144 19.6837 8.18162 20.0455L7.22721 20.1818C6.0517 20.3498 5 19.4376 5 18.2502V16.9347Z"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        {/* </Link> */}
        <Link to="/settings" className={styles["navbar__item"]}>
          <span className={styles["navbar__text"]}>Settings</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`${styles["navbar__icon"]} ${
              settings ? styles["navbar__icon--active"] : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="2" strokeWidth="2" />
            <path
              d="M5.39855 5.87919C4.46882 6.88128 3.7937 8.0705 3.4006 9.34458L4.99991 10.2679C6.33324 11.0377 6.33324 12.9622 4.99991 13.732L3.39889 14.6564C3.5941 15.2864 3.86206 15.9047 4.20576 16.5C4.54945 17.0953 4.95088 17.6364 5.39888 18.1205L6.99994 17.1961C8.33327 16.4263 9.99994 17.3886 9.99994 18.9282L9.99994 20.775C11.2999 21.0716 12.6673 21.0815 14 20.7774L14 18.9283C14 17.3887 15.6667 16.4264 17 17.1962L18.6014 18.1208C19.5312 17.1187 20.2063 15.9295 20.5994 14.6554L19 13.732C17.6667 12.9622 17.6667 11.0377 19 10.2679L20.6011 9.34352C20.4059 8.7135 20.1379 8.09527 19.7942 7.49998C19.4505 6.90468 19.0491 6.36349 18.6011 5.87941L17 6.80377C15.6667 7.57357 14 6.61132 14 5.07172L14 3.22499C12.7001 2.92838 11.3326 2.91844 9.99994 3.22257L9.99994 5.0717C9.99994 6.6113 8.33327 7.57355 6.99994 6.80375L5.39855 5.87919Z"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className={styles["navbar__empty"]}></div>
    </ul>
  );
};

export default SideNavbar;
