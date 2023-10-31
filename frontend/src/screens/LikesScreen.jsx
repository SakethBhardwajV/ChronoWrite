import React from "react";
import styles from "../styles/BookmarksScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";

const LikesScreen = () => {
  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar likes />
        <main className={styles["main"]}>
          <h1 className={styles["main__title"]}>Liked Posts</h1>
          <Post>Yo</Post>
          <Post>Yo</Post>
          <Post>Yo</Post>
        </main>
      </div>
    </>
  );
};

export default LikesScreen;
