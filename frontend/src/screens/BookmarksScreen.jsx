import styles from "../styles/BookmarksScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { useGetUserBookmarkedPostsQuery } from "../slices/postApiSlice";

const BookmarksScreen = () => {
  const { data: posts, isLoading, error } = useGetUserBookmarkedPostsQuery();

  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar bookmarks />
        <main className={styles["main"]}>
          <h1 className={styles["main__title"]}>Bookmarks</h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Something went wrong.</div>
          ) : posts.length === 0 ? (
            <p className={styles["no-posts"]}>
              No posts are bookmarked by you.
            </p>
          ) : (
            posts.map((post) => (
              <Post
                key={post._id}
                content={post.content}
                details={post.user}
                stats={post}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default BookmarksScreen;
