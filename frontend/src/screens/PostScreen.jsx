import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetFullPostByIDQuery } from "../slices/postApiSlice";
import Loader from "../components/Loader";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";
import styles from "../styles/PostScreen.module.css";
const PostScreen = () => {
  const { id: postId } = useParams();

  const { data: post, isLoading, error } = useGetFullPostByIDQuery(postId);

  // console.log(post);

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
            <>
              {post.parentPost && (
                <>
                  <Post
                    content={post.parentPost.content}
                    details={post.parentPost.user}
                    stats={post.parentPost}
                    className={styles["parent"]}
                  />
                </>
              )}
              <Post
                content={post.mainPost.content}
                details={post.mainPost.user}
                stats={post.mainPost}
                className={styles["main-post"]}
                disable
              />
              <p className={styles["replies"]}>Replies</p>
              {post.comments.length > 0 ? (
                <>
                  {post.comments.map((post) => (
                    <Post
                      key={post._id}
                      content={post.content}
                      details={post.user}
                      stats={post}
                      // showActions
                    />
                  ))}
                </>
              ) : (
                <p className={styles["no-replies"]}>No replies yet</p>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default PostScreen;
