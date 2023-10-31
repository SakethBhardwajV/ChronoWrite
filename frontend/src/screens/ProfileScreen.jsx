import React from "react";
import styles from "../styles/ProfileScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Button from "../components/Button";
import Post from "../components/Post";

const ProfileScreen = () => {
  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar profile />
        <main className={styles["main"]}>
          <div className={styles["user-profile"]}>
            <div className={styles["user-profile__img"]}></div>
            <h3 className={styles["user-profile__name"]}>User's name</h3>
            <p className={styles["user-profile__username"]}>@username</p>
          </div>
          <div className={styles["user-profile__info"]}>
            <div className={styles["user-profile__info__item"]}>
              <p className={styles["user-profile__info__item__number"]}>XX</p>
              <p className={styles["user-profile__info__item__name"]}>
                followers
              </p>
            </div>
            <div className={styles["user-profile__info__item"]}>
              <p className={styles["user-profile__info__item__number"]}>XX</p>
              <p className={styles["user-profile__info__item__name"]}>posts</p>
            </div>
            <div className={styles["user-profile__info__item"]}>
              <p className={styles["user-profile__info__item__number"]}>XX</p>
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

          <div className={styles["user-profile__content"]}>
            <Post>Yo</Post>
            <Post>Yo</Post>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileScreen;
