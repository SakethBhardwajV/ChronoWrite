import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../styles/ProfileScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import Button from "../components/Button";
import Post from "../components/Post";
import Loader from "../components/Loader";
import {
  useGetUserAndPostsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../slices/userApiSlice";
import { removeFollowing, addFollowing } from "../slices/authSlice";
import {
  useDeletePostMutation,
  useUnSuperLikePostMutation,
  useUnbookmarkPostMutation,
  useUnlikePostMutation,
} from "../slices/postApiSlice";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const { id: username } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data: userAndPosts,
    refetch,
    isLoading,
    error,
  } = useGetUserAndPostsQuery(username);

  const { user, posts } = userAndPosts || { user: {}, posts: [] };

  const [isFollowing, setIsFollowing] = useState(
    userInfo?.following?.includes(user._id)
  );

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [deletePost] = useDeletePostMutation();

  const [unbookmarkPost] = useUnbookmarkPostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [unSuperLikePost] = useUnSuperLikePostMutation();

  const followHandler = () => {
    if (isFollowing) {
      unfollowUser(user._id);
      setIsFollowing(false);
      dispatch(removeFollowing(user._id));
    } else {
      followUser(user._id);
      setIsFollowing(true);
      dispatch(addFollowing(user._id));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      refetch();
      toast.success("Post deleted successfully");
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

  useEffect(() => {
    // Update isFollowing when userInfo or user._id changes
    setIsFollowing(userInfo?.following?.includes(user._id));
  }, [userInfo, user._id]);

  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar profile />
        <main className={styles["main"]}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p>Something went wrong. {error.error}</p>
          ) : (
            <>
              <div className={styles["user-profile"]}>
                <div className={styles["user-profile__img"]}>
                  <img
                    src={user.avatar}
                    alt="profile-img"
                    className={styles["avatar"]}
                  />
                </div>
                <h3 className={styles["user-profile__name"]}>{user.name}</h3>
                <p className={styles["user-profile__username"]}>
                  @{user.username}
                </p>
              </div>
              <div className={styles["user-profile__info"]}>
                <div className={styles["user-profile__info__item"]}>
                  <p className={styles["user-profile__info__item__number"]}>
                    {user.followers.length}
                  </p>
                  <p className={styles["user-profile__info__item__name"]}>
                    followers
                  </p>
                </div>
                <div className={styles["user-profile__info__item"]}>
                  <p className={styles["user-profile__info__item__number"]}>
                    {posts?.length || "XX"}
                  </p>
                  <p className={styles["user-profile__info__item__name"]}>
                    posts
                  </p>
                </div>
                <div className={styles["user-profile__info__item"]}>
                  <p className={styles["user-profile__info__item__number"]}>
                    {user.following.length}
                  </p>
                  <p className={styles["user-profile__info__item__name"]}>
                    following
                  </p>
                </div>
                {userInfo._id !== user._id && (
                  <Button
                    varient={isFollowing ? "tertiary" : "primary"}
                    type="block"
                    className={styles["user-profile__btn"]}
                    onClick={followHandler}
                    disabled={userInfo._id === user._id}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </div>
            </>
          )}

          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Your data is being loaded</div>
          ) : posts.length === 0 || posts === undefined ? (
            <p className={styles["no-posts"]}>No posts.</p>
          ) : (
            <div className={styles["user-profile__content"]}>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  content={post.content}
                  details={post.user}
                  stats={post}
                  showActions
                  deletePost={() => handleDelete(post._id)}
                  unlike={() => handleUnlike(post._id)}
                  unsuperlike={() => handleUnSuperLike(post._id)}
                  unbookmark={() => handleUnbookmark(post._id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ProfileScreen;
