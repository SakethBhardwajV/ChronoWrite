import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Post.module.css";
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useBookmarkPostMutation,
  useUnbookmarkPostMutation,
  useSuperLikePostMutation,
  useUnSuperLikePostMutation,
  useDeletePostMutation,
} from "../slices/postApiSlice";

const Post = ({ content, details, stats, className, disable, deletePost }) => {
  const navigate = useNavigate();

  const { bookmarkedBy, likedBy, superLikedBy } = stats;

  const [likeCount, setLikeCount] = useState(likedBy.length);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarkedBy.length);
  const [superLikedCount, setSuperLiked] = useState(superLikedBy.length);

  const { userInfo } = useSelector((state) => state.auth);

  const [isLiked, setIsLiked] = useState(likedBy.includes(userInfo._id));
  const [isSuperLiked, setIsSuperLiked] = useState(
    superLikedBy.includes(userInfo._id)
  );
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarkedBy.includes(userInfo._id)
  );

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [bookmarkPost] = useBookmarkPostMutation();
  const [unbookmarkPost] = useUnbookmarkPostMutation();
  const [superLikePost] = useSuperLikePostMutation();
  const [unSuperLikePost] = useUnSuperLikePostMutation();

  // const [deletePost] = useDeletePostMutation();

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

  // const handleDelete = async () => {
  //   try {
  //     await deletePost(stats._id);
  //     console.log("post deleted");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className={styles["post"] + (className ? ` ${className}` : "")}>
      <div className={styles["post__left"]}>
        <img src={details.avatar} alt="user" className={styles["post__img"]} />
      </div>

      {userInfo._id === details._id && (
        <div className={styles["post__actions"]}>
          <button
            className={`${styles["post__action"]} ${styles["post__action--edit"]}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92971 19.283L5.92972 19.283L5.95149 19.2775L5.95151 19.2775L8.58384 18.6194C8.59896 18.6156 8.61396 18.6119 8.62885 18.6082C8.85159 18.5528 9.04877 18.5037 9.2278 18.4023C9.40683 18.301 9.55035 18.1571 9.71248 17.9947C9.72332 17.9838 9.73425 17.9729 9.74527 17.9618L16.9393 10.7678L16.9393 10.7678L16.9626 10.7445C17.2761 10.4311 17.5461 10.1611 17.7333 9.91573C17.9339 9.65281 18.0858 9.36038 18.0858 9C18.0858 8.63961 17.9339 8.34719 17.7333 8.08427C17.5461 7.83894 17.276 7.5689 16.9626 7.2555L16.9393 7.23223L16.5858 7.58579L16.9393 7.23223L16.7678 7.06066L16.7445 7.03738C16.4311 6.72395 16.1611 6.45388 15.9157 6.2667C15.6528 6.0661 15.3604 5.91421 15 5.91421C14.6396 5.91421 14.3472 6.0661 14.0843 6.2667C13.8389 6.45388 13.5689 6.72395 13.2555 7.03739L13.2322 7.06066L6.03816 14.2547C6.02714 14.2658 6.01619 14.2767 6.00533 14.2875C5.84286 14.4496 5.69903 14.5932 5.59766 14.7722C5.4963 14.9512 5.44723 15.1484 5.39179 15.3711C5.38809 15.386 5.38435 15.401 5.38057 15.4162L4.71704 18.0703C4.71483 18.0791 4.7126 18.088 4.71036 18.097C4.67112 18.2537 4.62921 18.421 4.61546 18.5615C4.60032 18.7163 4.60385 18.9773 4.81326 19.1867C5.02267 19.3961 5.28373 19.3997 5.43846 19.3845C5.57899 19.3708 5.74633 19.3289 5.90301 19.2896C5.91195 19.2874 5.92085 19.2852 5.92971 19.283Z"
                stroke="#FFF"
              />
              <path
                d="M12.5 7.5L15.5 5.5L18.5 8.5L16.5 11.5L12.5 7.5Z"
                fill="#FFF"
              />
            </svg>
          </button>
          <button
            className={`${styles["post__action"]} ${styles["post__action--delete"]}`}
            onClick={deletePost}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 15L10 12" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 15L14 12" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      <div
        className={styles["post__right"]}
        style={disable ? { pointerEvents: "none" } : { pointerEvents: "auto" }}
        onClick={disable ? () => {} : () => navigate(`/post/${stats._id}`)}
      >
        <div className={styles["post__top"]}>
          <div className={styles["post__text"]}>
            <p className={styles["post__name"]}>{details.name}</p>
            <p className={styles["post__username"]}>@{details.username}</p>
          </div>
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
          {/* <button
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
          </button> */}
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
