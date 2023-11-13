import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../styles/ProfileScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Button from "../components/Button";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { useGetUserPostsQuery } from "../slices/postApiSlice";
import { useGetUserQuery } from "../slices/userApiSlice";

const ProfileScreen = () => {
  const { id: username } = useParams();

  const { data: userInfo, isLoading, error } = useGetUserQuery(username);
  console.log(userInfo);

  // const {
  //   data: posts,
  //   isLoading: loadingUserPosts,
  //   error: errorUserPosts,
  // } = useGetUserPostsQuery(userInfo._id);

  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar profile />
        <main className={styles["main"]}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p>Something went wrong. {error.error}</p>
          ) : (
            <>
              <div className={styles["user-profile"]}>
                <div className={styles["user-profile__img"]}></div>
                <h3 className={styles["user-profile__name"]}>
                  {userInfo.name}
                </h3>
                <p className={styles["user-profile__username"]}>
                  @{userInfo.username}
                </p>
              </div>
              <div className={styles["user-profile__info"]}>
                <div className={styles["user-profile__info__item"]}>
                  <p className={styles["user-profile__info__item__number"]}>
                    XX
                  </p>
                  <p className={styles["user-profile__info__item__name"]}>
                    followers
                  </p>
                </div>
                <div className={styles["user-profile__info__item"]}>
                  <p className={styles["user-profile__info__item__number"]}>
                    XX
                  </p>
                  <p className={styles["user-profile__info__item__name"]}>
                    posts
                  </p>
                </div>
                <div className={styles["user-profile__info__item"]}>
                  <p className={styles["user-profile__info__item__number"]}>
                    XX
                  </p>
                  <p className={styles["user-profile__info__item__name"]}>
                    following
                  </p>
                </div>
                <Button
                  varient="primary"
                  type="block"
                  className={styles["user-profile__btn"]}
                >
                  Follow
                </Button>
              </div>
            </>
          )}

          {/* {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Something went wrong.</div>
          ) : posts.length === 0 ? (
            <p className={styles["no-posts"]}>No posts.</p>
          ) : (
            <div className={styles["user-profile__content"]}>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  content={post.content}
                  details={post.user}
                  stats={post}
                />
              ))}
            </div>
          )} */}
        </main>
      </div>
    </>
  );
};

export default ProfileScreen;
