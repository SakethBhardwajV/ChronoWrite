import { useState } from "react";
import styles from "../styles/Post.module.css";
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useBookmarkPostMutation,
  useUnbookmarkPostMutation,
  useSuperLikePostMutation,
  useUnSuperLikePostMutation,
} from "../slices/postApiSlice";

const Post = ({ content, details, stats }) => {
  const { bookmarkedBy, likedBy, superLikedBy } = stats;

  const [likeCount, setLikeCount] = useState(likedBy.length);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarkedBy.length);
  const [superLikedCount, setSuperLiked] = useState(superLikedBy.length);

  const [isLiked, setIsLiked] = useState(likedBy.length > 0 ? true : false);
  const [isSuperLiked, setIsSuperLiked] = useState(
    superLikedBy.length > 0 ? true : false
  );
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarkedBy.length > 0 ? true : false
  );

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [bookmarkPost] = useBookmarkPostMutation();
  const [unbookmarkPost] = useUnbookmarkPostMutation();
  const [superLikePost] = useSuperLikePostMutation();
  const [unSuperLikePost] = useUnSuperLikePostMutation();

  const handleLike = async () => {
    try {
      await likePost(stats._id);
      setLikeCount(likeCount + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikePost(stats._id);
      setLikeCount(likeCount - 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = async () => {
    try {
      await bookmarkPost(stats._id);
      setBookmarkCount(bookmarkCount + 1);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnbookmark = async () => {
    try {
      await unbookmarkPost(stats._id);
      setBookmarkCount(bookmarkCount - 1);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuperLike = async () => {
    try {
      await superLikePost(stats._id);
      setSuperLiked(superLikedCount + 1);
      setIsSuperLiked(!isSuperLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnSuperLike = async () => {
    try {
      await unSuperLikePost(stats._id);
      setSuperLiked(superLikedCount - 1);
      setIsSuperLiked(!isSuperLiked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["post"]}>
      <div className={styles["post__left"]}>
        <img
          src="https://i.imgur.com/D915HCO.png"
          alt="user"
          className={styles["post__img"]}
        />
      </div>

      <div className={styles["post__right"]}>
        <div className={styles["post__text"]}>
          <p className={styles["post__name"]}>{details.name}</p>
          <p className={styles["post__username"]}>@{details.username}</p>
        </div>

        <p className={styles["post__content"]}>{content}</p>

        <div className={styles["post__btns"]}>
          <button
            className={`${styles["post__button"]} ${
              styles["post__button--like"]
            } ${isLiked ? styles["post__button--active"] : ""}`}
            onClick={!isLiked ? handleLike : handleUnlike}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles["post__button__icon"]} ${styles["post__button__icon--like"]}`}
            >
              <path d="M3.66276 13.2135L9.82378 19.7065C11.0068 20.9532 12.9933 20.9532 14.1762 19.7065L20.3373 13.2135C22.5543 10.877 22.5543 7.08882 20.3373 4.75235C18.1203 2.41588 14.5258 2.41588 12.3088 4.75235V4.75235C12.1409 4.92925 11.8591 4.92925 11.6912 4.75235V4.75235C9.47422 2.41588 5.87976 2.41588 3.66276 4.75235C1.44576 7.08883 1.44576 10.877 3.66276 13.2135Z" />
            </svg>
            <span className={`${styles["post__button__count"]}`}>
              {likeCount}
            </span>
          </button>
          <button
            className={`${styles["post__button"]} ${styles["post__button--comment"]} `}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["post__button__icon"]}
            >
              <g clipPath="url(#clip0_1_19708)">
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_19708">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className={styles["post__button__count"]}>3</span>
          </button>
          <button
            className={`${styles["post__button"]} ${
              styles["post__button--bookmark"]
            }  ${isBookmarked ? styles["post__button--active"] : ""}`}
            onClick={!isBookmarked ? handleBookmark : handleUnbookmark}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles["post__button__icon"]} ${styles["post__button__icon--bookmark"]}`}
            >
              <path d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z" />
            </svg>
            <span className={styles["post__button__count"]}>
              {bookmarkCount}
            </span>
          </button>
          <button
            className={`${styles["post__button"]} ${
              styles["post__button--superlike"]
            } ${isSuperLiked ? styles["post__button--active"] : ""}`}
            onClick={!isSuperLiked ? handleSuperLike : handleUnSuperLike}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles["post__button__icon"]} ${styles["post__button__icon--superlike"]}`}
            >
              <g clipPath="url(#clip0_1_20462)">
                <path
                  d="M12 2L15.1035 8.72839L22.4616 9.60081L17.0216 14.6316L18.4656 21.8992L12 18.28L5.53437 21.8992L6.97843 14.6316L1.53839 9.60081L8.89651 8.72839L12 2Z"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_20462">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className={styles["post__button__count"]}>
              {superLikedCount}
            </span>
          </button>
          <div className={styles["post__share-container"]}>
            <button
              className={`${styles["post__button"]} ${styles["post__button--share"]}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles["post__button__icon"]}
              >
                <g clipPath="url(#clip0_1_19706)">
                  <path
                    d="M15 5L12 2M12 2L9 5M12 2L12 14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 9H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V9H18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
