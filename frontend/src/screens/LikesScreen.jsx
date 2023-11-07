import React from "react";
import styles from "../styles/BookmarksScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { useGetUserLikedPostsQuery } from "../slices/postApiSlice";

const LikesScreen = () => {
  const { data: posts, isLoading, error } = useGetUserLikedPostsQuery();

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
