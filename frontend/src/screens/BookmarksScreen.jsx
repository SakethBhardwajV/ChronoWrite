import React from "react";
import styles from "../styles/BookmarksScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";

const BookmarksScreen = () => {
  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar bookmarks />
        <main className={styles["main"]}>
          <h1 className={styles["main__title"]}>Bookmarks</h1>
          <Post>Yo</Post>
          <Post>Yo</Post>
        </main>
      </div>
    </>
  );
};

export default BookmarksScreen;
