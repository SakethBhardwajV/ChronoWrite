import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/HomeScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Post from "../components/Post";
import {
  useCreatePostMutation,
  useGetFollowingUsersPostsQuery,
  useUnSuperLikePostMutation,
  useUnbookmarkPostMutation,
  useUnlikePostMutation,
} from "../slices/postApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const HomeScreen = () => {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const textAreaRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: posts,
    refetch,
    isLoading,
    error,
  } = useGetFollowingUsersPostsQuery();

  const [createPost, { isLoading: loadingPostCreation }] =
    useCreatePostMutation();

  const [unbookmarkPost] = useUnbookmarkPostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [unSuperLikePost] = useUnSuperLikePostMutation();

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createPost({ text: text.substring(0, 200) }).unwrap();
      setText("");
      setCharCount(0);
      refetch();
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleUnbookmark = async (postId) => {
    try {
      await unbookmarkPost(postId);
      console.log("post unbookmarked");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await unlikePost(postId);
      console.log("post unliked");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnSuperLike = async (postId) => {
    try {
      await unSuperLikePost(postId);
      console.log("post unsuperliked");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar home />
        <main className={styles["main"]}>
          <div className={styles["post-input"]}>
            <div className={styles["post-input__left"]}>
              <img
                src={userInfo.avatar}
                alt="user"
                className={styles["post-input__img"]}
              />
            </div>
            <form
              className={styles["post-input__right"]}
              onSubmit={submitHandler}
            >
              <div className={styles["post-input__text"]}>
                <p className={styles["post-input__name"]}>{userInfo.name}</p>
                <p className={styles["post-input__username"]}>
                  @{userInfo.username}
                </p>
              </div>

              <textarea
                name="post-input__input"
                placeholder="What's happening?"
                className={styles["post-input__input"]}
                rows="1"
                value={text}
                onChange={handleChange}
                ref={textAreaRef}
              />
              <span
                className={`${styles["post-input__counter"]} ${
                  charCount > 200 ? styles["post-input__counter--limit"] : ""
                }`}
              >
                {charCount}/200
              </span>
              <button type="submit" className={styles["post-input__button"]}>
                Post
              </button>

              {loadingPostCreation && <Loader />}
            </form>
          </div>

          {isLoading ? (
            <Loader />
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
                      unlike={() => handleUnlike(post._id)}
                      unsuperlike={() => handleUnSuperLike(post._id)}
                      unbookmark={() => handleUnbookmark(post._id)}
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
