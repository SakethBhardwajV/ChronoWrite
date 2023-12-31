import { Link } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import styles from "../styles/SettingsScreen.module.css";

const SettingsScreen = () => {
  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar settings />
        <main className={styles["main"]}>
          <h1 className={styles["main__title"]}>Settings</h1>
          <div className={styles["main__container"]}>
            <Link to="/bookmarks" className={styles["main__container__item"]}>
              <p className={styles["main__container__item__title"]}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={`${styles["main__container__item__icon"]} ${styles["main__container__item__icon--bookmarks"]}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z"
                    strokeWidth="1.5"
                  />
                </svg>
                Bookmarks
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.528 6.46731C10.2338 6.17573 9.75889 6.17784 9.46731 6.47204C9.17573 6.76624 9.17784 7.24111 9.47204 7.53269L11.235 9.28C11.9505 9.98914 12.4413 10.4772 12.7734 10.8907C13.096 11.2924 13.2067 11.5504 13.2361 11.7815C13.2546 11.9266 13.2546 12.0734 13.2361 12.2185C13.2067 12.4496 13.096 12.7076 12.7734 13.1093C12.4413 13.5228 11.9505 14.0109 11.235 14.72L9.47204 16.4673C9.17784 16.7589 9.17573 17.2338 9.46731 17.528C9.75889 17.8222 10.2338 17.8243 10.528 17.5327L12.3227 15.7539C12.9987 15.084 13.5511 14.5364 13.9429 14.0485C14.3504 13.5412 14.6453 13.0263 14.7241 12.4082C14.7586 12.1371 14.7586 11.8629 14.7241 11.5918C14.6453 10.9737 14.3504 10.4588 13.9429 9.95146C13.5511 9.46359 12.9987 8.91604 12.3227 8.24609L10.528 6.46731Z"
                  fill="#FAFAFA"
                />
              </svg>
            </Link>
            <Link to="/likes" className={styles["main__container__item"]}>
              <p className={styles["main__container__item__title"]}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles["main__container__item__icon"]} ${styles["main__container__item__icon--likes"]}`}
                >
                  <path
                    d="M3.66276 13.2135L9.82378 19.7065C11.0068 20.9532 12.9933 20.9532 14.1762 19.7065L20.3373 13.2135C22.5543 10.877 22.5543 7.08882 20.3373 4.75235C18.1203 2.41588 14.5258 2.41588 12.3088 4.75235V4.75235C12.1409 4.92925 11.8591 4.92925 11.6912 4.75235V4.75235C9.47422 2.41588 5.87976 2.41588 3.66276 4.75235C1.44576 7.08883 1.44576 10.877 3.66276 13.2135Z"
                    strokeWidth="1.5"
                    stroke="#FFF"
                  />
                </svg>
                Likes
              </p>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.528 6.46731C10.2338 6.17573 9.75889 6.17784 9.46731 6.47204C9.17573 6.76624 9.17784 7.24111 9.47204 7.53269L11.235 9.28C11.9505 9.98914 12.4413 10.4772 12.7734 10.8907C13.096 11.2924 13.2067 11.5504 13.2361 11.7815C13.2546 11.9266 13.2546 12.0734 13.2361 12.2185C13.2067 12.4496 13.096 12.7076 12.7734 13.1093C12.4413 13.5228 11.9505 14.0109 11.235 14.72L9.47204 16.4673C9.17784 16.7589 9.17573 17.2338 9.46731 17.528C9.75889 17.8222 10.2338 17.8243 10.528 17.5327L12.3227 15.7539C12.9987 15.084 13.5511 14.5364 13.9429 14.0485C14.3504 13.5412 14.6453 13.0263 14.7241 12.4082C14.7586 12.1371 14.7586 11.8629 14.7241 11.5918C14.6453 10.9737 14.3504 10.4588 13.9429 9.95146C13.5511 9.46359 12.9987 8.91604 12.3227 8.24609L10.528 6.46731Z"
                  fill="#FAFAFA"
                />
              </svg>
            </Link>
            <Link
              to="/settings/profile"
              className={styles["main__container__item"]}
            >
              <p className={styles["main__container__item__title"]}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`${styles["main__container__item__icon"]} ${styles["main__container__item__icon--edit"]}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_20437)">
                    <path
                      d="M5 16L4 20L8 19L19.5858 7.41421C20.3668 6.63316 20.3668 5.36683 19.5858 4.58579L19.4142 4.41421C18.6332 3.63316 17.3668 3.63317 16.5858 4.41421L5 16Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 6L18 9"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 20H21"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_20437">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Edit Profile
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.528 6.46731C10.2338 6.17573 9.75889 6.17784 9.46731 6.47204C9.17573 6.76624 9.17784 7.24111 9.47204 7.53269L11.235 9.28C11.9505 9.98914 12.4413 10.4772 12.7734 10.8907C13.096 11.2924 13.2067 11.5504 13.2361 11.7815C13.2546 11.9266 13.2546 12.0734 13.2361 12.2185C13.2067 12.4496 13.096 12.7076 12.7734 13.1093C12.4413 13.5228 11.9505 14.0109 11.235 14.72L9.47204 16.4673C9.17784 16.7589 9.17573 17.2338 9.46731 17.528C9.75889 17.8222 10.2338 17.8243 10.528 17.5327L12.3227 15.7539C12.9987 15.084 13.5511 14.5364 13.9429 14.0485C14.3504 13.5412 14.6453 13.0263 14.7241 12.4082C14.7586 12.1371 14.7586 11.8629 14.7241 11.5918C14.6453 10.9737 14.3504 10.4588 13.9429 9.95146C13.5511 9.46359 12.9987 8.91604 12.3227 8.24609L10.528 6.46731Z"
                  fill="#FAFAFA"
                />
              </svg>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default SettingsScreen;
