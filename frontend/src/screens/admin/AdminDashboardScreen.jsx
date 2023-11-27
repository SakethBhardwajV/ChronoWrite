import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/AdminDashboardScreen.module.css";
import ProfileNavbar from "../../components/ProfileNavbar.jsx";
import { useGetAllUsersQuery } from "../../slices/userApiSlice";
import { useGetAllPostsQuery } from "../../slices/postApiSlice";

const AdminDashboardScreen = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: users } = useGetAllUsersQuery();
  const { data: posts } = useGetAllPostsQuery();

  const registeredUsers = users?.length;
  const verifiedUsers = users?.filter((user) => user.isVerified).length;
  const unverifiedUsers = users?.filter((user) => !user.isVerified).length;
  const adminUsers = users?.filter((user) => user.isAdmin).length;

  const postsPublished = posts?.length;
  const likedPosts = posts?.reduce((acc, post) => {
    return acc + post.likedBy.length;
  }, 0);
  const bookmarkedPosts = posts?.reduce((acc, post) => {
    return acc + post.bookmarkedBy.length;
  }, 0);

  return (
    <>
      <div className={styles["container"]}>
        <ProfileNavbar dashboard />
        <main className={styles["main"]}>
          <div className={styles["main__content"]}>
            <div className={styles["main__content__header"]}>
              <h1 className={styles["main__content__header__title"]}>
                Dashboard
              </h1>
              <p className={styles["main__content__header__subtitle"]}>
                Welcome back, {userInfo.name}
              </p>
            </div>
            <div className={styles["main__content__body"]}>
              <div className={styles["main__content__body__item"]}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={styles["main__content__body__item__icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.98722 13.5788C3.44347 12.5039 4.50869 11.75 5.75 11.75H10.25C11.4913 11.75 12.5565 12.5039 13.0128 13.5788M11 6.125C11 7.78185 9.65685 9.125 8 9.125C6.34315 9.125 5 7.78185 5 6.125C5 4.46815 6.34315 3.125 8 3.125C9.65685 3.125 11 4.46815 11 6.125ZM15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={styles["main__content__body__item__title"]}>
                  Registered Users
                </p>
                <p className={styles["main__content__body__item__number"]}>
                  {registeredUsers}
                </p>
              </div>
              <div className={styles["main__content__body__item"]}>
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  className={styles["main__content__body__item__icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 13.75V12.85C11 11.5899 11 10.9598 10.7548 10.4785C10.539 10.0552 10.1948 9.71095 9.77148 9.49524C9.29018 9.25 8.66012 9.25 7.4 9.25H4.1C2.83988 9.25 2.20982 9.25 1.72852 9.49524C1.30516 9.71095 0.96095 10.0552 0.745235 10.4785C0.5 10.9598 0.5 11.5899 0.5 12.85V13.75M11 2.5L12.5 4L15.5 1M8.375 3.625C8.375 5.07475 7.19975 6.25 5.75 6.25C4.30025 6.25 3.125 5.07475 3.125 3.625C3.125 2.17525 4.30025 1 5.75 1C7.19975 1 8.375 2.17525 8.375 3.625Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={styles["main__content__body__item__title"]}>
                  Verified Users
                </p>
                <p className={styles["main__content__body__item__number"]}>
                  {verifiedUsers}
                </p>
              </div>
              <div className={styles["main__content__body__item"]}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={styles["main__content__body__item__icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.375 11L15.125 14.75M15.125 11L11.375 14.75M8 10.625H4.625C3.57833 10.625 3.05499 10.625 2.62914 10.7542C1.67034 11.045 0.92003 11.7953 0.62918 12.7541C0.5 13.18 0.5 13.7033 0.5 14.75M9.875 4.625C9.875 6.48896 8.36396 8 6.5 8C4.63604 8 3.125 6.48896 3.125 4.625C3.125 2.76104 4.63604 1.25 6.5 1.25C8.36396 1.25 9.875 2.76104 9.875 4.625Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className={styles["main__content__body__item__title"]}>
                  Unverified Users
                </p>
                <p className={styles["main__content__body__item__number"]}>
                  {unverifiedUsers}
                </p>
              </div>
              <div className={styles["main__content__body__item"]}>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  className={styles["main__content__body__item__icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 0.702148V3.80005C8.5 4.22009 8.5 4.43011 8.58175 4.59055C8.65365 4.73167 8.76839 4.8464 8.90951 4.91831C9.06994 5.00005 9.27996 5.00005 9.7 5.00005H12.7979M8.5 11.75H4M10 8.75H4M13 6.49117V11.9C13 13.1601 13 13.7902 12.7548 14.2715C12.539 14.6948 12.1948 15.039 11.7715 15.2548C11.2902 15.5 10.6601 15.5 9.4 15.5H4.6C3.33988 15.5 2.70982 15.5 2.22852 15.2548C1.80516 15.039 1.46095 14.6948 1.24524 14.2715C1 13.7902 1 13.1601 1 11.9V4.1C1 2.83988 1 2.20982 1.24524 1.72852C1.46095 1.30516 1.80516 0.96095 2.22852 0.745235C2.70982 0.5 3.33988 0.5 4.6 0.5H7.00883C7.55916 0.5 7.83432 0.5 8.09327 0.562168C8.32285 0.617285 8.54233 0.708195 8.74364 0.83156C8.9707 0.970704 9.16527 1.16527 9.55442 1.55442L11.9456 3.94558C12.3347 4.33473 12.5293 4.5293 12.6684 4.75636C12.7918 4.95767 12.8827 5.17715 12.9378 5.40673C13 5.66568 13 5.94084 13 6.49117Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className={styles["main__content__body__item__title"]}>
                  Posts Published
                </p>
                <p className={styles["main__content__body__item__number"]}>
                  {postsPublished}
                </p>
              </div>
              <div className={styles["main__content__body__item"]}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={styles["main__content__body__item__icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99486 2.85186C6.49535 1.0988 3.99481 0.627232 2.11602 2.23251C0.237233 3.83779 -0.0272742 6.52173 1.44815 8.4203C2.67486 9.99883 6.38733 13.3281 7.60408 14.4056C7.7402 14.5262 7.80827 14.5865 7.88766 14.6101C7.95695 14.6308 8.03277 14.6308 8.10207 14.6101C8.18146 14.5865 8.24952 14.5262 8.38565 14.4056C9.6024 13.3281 13.3149 9.99883 14.5416 8.4203C16.017 6.52173 15.7848 3.8209 13.8737 2.23251C11.9626 0.644118 9.49438 1.0988 7.99486 2.85186Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className={styles["main__content__body__item__title"]}>
                  Likes
                </p>
                <p className={styles["main__content__body__item__number"]}>
                  {likedPosts}
                </p>
              </div>
              <div className={styles["main__content__body__item"]}>
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  className={styles["main__content__body__item__icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 4.85C0.75 3.58988 0.75 2.95982 0.995235 2.47852C1.21095 2.05516 1.55516 1.71095 1.97852 1.49524C2.45982 1.25 3.08988 1.25 4.35 1.25H7.65C8.91012 1.25 9.54018 1.25 10.0215 1.49524C10.4448 1.71095 10.789 2.05516 11.0048 2.47852C11.25 2.95982 11.25 3.58988 11.25 4.85V14.75L6 11.75L0.75 14.75V4.85Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className={styles["main__content__body__item__title"]}>
                  Bookmarks
                </p>
                <p className={styles["main__content__body__item__number"]}>
                  {bookmarkedPosts}
                </p>
              </div>
              <div className={styles["main__content__body__item"]}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  className={styles["main__content__body__item__icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3788 6.08176C13.8415 5.90183 14.0728 5.81187 14.1378 5.68466C14.194 5.57446 14.1923 5.44359 14.1332 5.3349C14.0649 5.20944 13.8313 5.12558 13.364 4.95785L1.44679 0.679845C1.06452 0.542619 0.873384 0.474006 0.748429 0.517278C0.63979 0.5549 0.554413 0.640278 0.51679 0.748916C0.473518 0.873871 0.54213 1.06501 0.679355 1.44728L4.95732 13.3646C5.12505 13.8318 5.20892 14.0654 5.33437 14.1337C5.44306 14.1928 5.57393 14.1946 5.68414 14.1383C5.81134 14.0733 5.90131 13.842 6.08124 13.3793L8.02887 8.37113C8.06412 8.28049 8.08174 8.23517 8.10896 8.19701C8.13309 8.16319 8.16267 8.13361 8.19649 8.10949C8.23465 8.08227 8.27997 8.06464 8.3706 8.0294L13.3788 6.08176Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className={styles["main__content__body__item__title"]}>
                  Posts shared
                </p>
                <p className={styles["main__content__body__item__number"]}>
                  XX
                </p>
              </div>
              <div className={styles["main__content__body__item"]}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={styles["main__content__body__item__icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.04677 13.5283L6.4851 14.5142C6.61541 14.8076 6.82806 15.057 7.09727 15.232C7.36648 15.4069 7.68069 15.5001 8.00177 15.5C8.32285 15.5001 8.63706 15.4069 8.90627 15.232C9.17548 15.057 9.38813 14.8076 9.51844 14.5142L9.95677 13.5283C10.1128 13.1785 10.3753 12.8869 10.7068 12.695C11.0404 12.5026 11.4263 12.4206 11.8093 12.4608L12.8818 12.575C13.201 12.6088 13.5232 12.5492 13.8093 12.4035C14.0954 12.2578 14.333 12.0322 14.4934 11.7542C14.6541 11.4763 14.7306 11.1577 14.7137 10.8372C14.6969 10.5166 14.5873 10.2079 14.3984 9.94833L13.7634 9.07583C13.5373 8.76285 13.4165 8.38611 13.4184 8C13.4184 7.61494 13.5403 7.23976 13.7668 6.92833L14.4018 6.05583C14.5907 5.79632 14.7002 5.48755 14.7171 5.16701C14.7339 4.84646 14.6574 4.52791 14.4968 4.25C14.3363 3.97193 14.0987 3.74637 13.8126 3.60067C13.5265 3.45497 13.2044 3.3954 12.8851 3.42917L11.8126 3.54333C11.4296 3.58356 11.0437 3.50159 10.7101 3.30917C10.3779 3.11619 10.1154 2.82302 9.9601 2.47167L9.51844 1.48583C9.38813 1.19238 9.17548 0.943036 8.90627 0.768049C8.63706 0.593062 8.32285 0.499948 8.00177 0.5C7.68069 0.499948 7.36648 0.593062 7.09727 0.768049C6.82806 0.943036 6.61541 1.19238 6.4851 1.48583L6.04677 2.47167C5.89147 2.82302 5.62892 3.11619 5.29677 3.30917C4.96318 3.50159 4.57727 3.58356 4.19427 3.54333L3.11844 3.42917C2.79918 3.3954 2.47699 3.45497 2.19092 3.60067C1.90485 3.74637 1.6672 3.97193 1.50677 4.25C1.34614 4.52791 1.26961 4.84646 1.28647 5.16701C1.30333 5.48755 1.41286 5.79632 1.60177 6.05583L2.23677 6.92833C2.46323 7.23976 2.58517 7.61494 2.5851 8C2.58517 8.38506 2.46323 8.76024 2.23677 9.07167L1.60177 9.94417C1.41286 10.2037 1.30333 10.5124 1.28647 10.833C1.26961 11.1535 1.34614 11.4721 1.50677 11.75C1.66736 12.0279 1.90504 12.2534 2.19107 12.399C2.4771 12.5447 2.79921 12.6044 3.11844 12.5708L4.19094 12.4567C4.57394 12.4164 4.95985 12.4984 5.29344 12.6908C5.62683 12.8833 5.89059 13.1765 6.04677 13.5283Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00043 10.25C9.24307 10.25 10.2504 9.24264 10.2504 8C10.2504 6.75736 9.24307 5.75 8.00043 5.75C6.75779 5.75 5.75043 6.75736 5.75043 8C5.75043 9.24264 6.75779 10.25 8.00043 10.25Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className={styles["main__content__body__item__title"]}>
                  Admins
                </p>
                <p className={styles["main__content__body__item__number"]}>
                  {adminUsers}
                </p>
              </div>
            </div>
            <div className={styles["main__content__footer"]}>
              <button
                className={styles["main__content__footer__btn"]}
                onClick={() => navigate("/home")}
              >
                Home
              </button>
              <button
                className={styles["main__content__footer__btn"]}
                onClick={() => navigate(`/user/${userInfo.username}`)}
              >
                Profile
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboardScreen;
