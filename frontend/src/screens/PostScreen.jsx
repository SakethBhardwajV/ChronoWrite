import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../slices/postApiSlice";
import Loader from "../components/Loader";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";
import styles from "../styles/PostScreen.module.css";
const PostScreen = () => {
  const { id: postId } = useParams();

  const { data: post, isLoading, error } = useGetPostByIdQuery(postId);

  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar />
        <main className={styles["main"]}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p>{error.error}</p>
          ) : (
            <Post content={post.content} details={post.user} stats={post} />
          )}
        </main>
      </div>
    </>
  );
};

export default PostScreen;
