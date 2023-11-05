import { useEffect, useRef, useState } from "react";
import styles from "../styles/HomeScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";
import { useGetFollowingUsersPostsQuery } from "../slices/postApiSlice";

const HomeScreen = () => {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const textAreaRef = useRef(null);

  const { data: posts, isLoading, error } = useGetFollowingUsersPostsQuery();

  const handleChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [text]);

  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar home />
        <main className={styles["main"]}>
          <div className={styles["post-input"]}>
            <div className={styles["post-input__left"]}>
              <img
                src="https://i.imgur.com/D915HCO.png"
                alt="user"
                className={styles["post-input__img"]}
              />
            </div>
            <form
              className={styles["post-input__right"]}
              onSubmit={(e) => {
                console.log("test");
                e.preventDefault();
              }}
            >
              <div className={styles["post-input__text"]}>
                <p className={styles["post-input__name"]}>Name</p>
                <p className={styles["post-input__username"]}>@bruh</p>
              </div>

              <textarea
                placeholder="What's happening?"
                className={styles["post-input__input"]}
                rows="1"
                value={text}
                onChange={handleChange}
                ref={textAreaRef}
              />
              <span className={`${styles["post-input__counter"]} `}>
                {charCount}/200
              </span>
              <button type="submit" className={styles["post-input__button"]}>
                Post
              </button>
            </form>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <div>{error?.data?.message || error.error}</div>
          ) : (
            <>
              {posts.length === 0 ? (
                <p className={styles["no-posts"]}>
                  No posts are posted by the people you follow.
                </p>
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
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default HomeScreen;
