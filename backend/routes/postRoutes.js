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
} from "../controllers/postControllers.js";

const router = express.Router();

router.post("/", createPost);
router.get("/user/:userID", getUserPosts);
router.get("/following", getFollowingPosts);
router.put("/like/:id", likePost);
router.put("/unlike/:id", unlikePost);
router.put("/superlike/:id", superLikePost);
router.put("/superunlike/:id", superUnlikePost);
router
  .route("/:id")
  .get(getPostByID)
  .put(updatePostByID)
  .delete(deletePostByID);
router.route("/profile/:id").put(updateUserPost).delete(deleteUserPost);

export default router;
