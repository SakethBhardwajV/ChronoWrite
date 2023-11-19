import styles from "../styles/BookmarksScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";
import Loader from "../components/Loader";
import {
  useGetUserLikedPostsQuery,
  useUnlikePostMutation,
  useUnSuperLikePostMutation,
} from "../slices/postApiSlice";

const LikesScreen = () => {
  const {
    data: posts,
    refetch,
    isLoading,
    error,
  } = useGetUserLikedPostsQuery();

  const [unlikePost] = useUnlikePostMutation();
  const [unSuperLikePost] = useUnSuperLikePostMutation();

  const handleUnlike = async (postId) => {
    try {
      await unlikePost(postId);
      refetch();
      console.log("post unliked");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnSuperLike = async (postId) => {
    try {
      await unSuperLikePost(postId);
      refetch();
      console.log("post unsuperliked");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar likes />
        <main className={styles["main"]}>
          <h1 className={styles["main__title"]}>Liked Posts</h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Something went wrong.</div>
          ) : posts.length === 0 ? (
            <p className={styles["no-posts"]}>No posts are liked by you.</p>
          ) : (
            posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  content={post.content}
                  details={post.user}
                  stats={post}
                  unlike={() => handleUnlike(post._id)}
                  unsuperlike={() => handleUnSuperLike(post._id)}
                />
              );
            })
          )}
        </main>
      </div>
    </>
  );
};

export default LikesScreen;
