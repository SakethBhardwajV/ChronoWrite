import styles from "../styles/BookmarksScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";
import Loader from "../components/Loader";
import {
  useGetUserBookmarkedPostsQuery,
  useUnbookmarkPostMutation,
} from "../slices/postApiSlice";

const BookmarksScreen = () => {
  const {
    data: posts,
    refetch,
    isLoading,
    error,
  } = useGetUserBookmarkedPostsQuery();

  const [unbookmarkPost] = useUnbookmarkPostMutation();

  const handleUnbookmark = async (postId) => {
    try {
      await unbookmarkPost(postId);
      refetch();
      console.log("post unbookmarked");
    } catch (error) {
      console.error(error);
    }
  };

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
                unbookmark={() => handleUnbookmark(post._id)}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default BookmarksScreen;
