import express from "express";
import {
  getPostByID,
  getUserPosts,
  createPost,
  updateUserPost,
  deleteUserPost,
  getFollowingPosts,
  likePost,
  unlikePost,
  superLikePost,
  superUnlikePost,
  updatePostByID,
  deletePostByID,
  addBookmarks,
  removeBookmarks,
  getAllBookmarkPosts,
  getAllLikedPosts,
} from "../controllers/postControllers.js";
import { protect, admin, member } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/user/:userID", protect, getUserPosts);
router.get("/following", protect, getFollowingPosts);
router.get("/liked", protect, getAllLikedPosts);
router.get("/bookmarks", protect, getAllBookmarkPosts);
router.put("/like/:id", protect, likePost);
router.put("/unlike/:id", protect, unlikePost);
router.put("/superlike/:id", protect, member, superLikePost);
router.put("/superunlike/:id", protect, member, superUnlikePost);
router
  .route("/:id")
  .get(protect, getPostByID)
  .put(protect, admin, updatePostByID)
  .delete(protect, admin, deletePostByID);
router
  .route("/profile/:id")
  .put(protect, admin, updateUserPost)
  .delete(protect, admin, deleteUserPost);
router.route("/bookmark/add/:id").put(protect, addBookmarks);
router.route("/bookmark/remove/:id").put(protect, removeBookmarks);

export default router;
