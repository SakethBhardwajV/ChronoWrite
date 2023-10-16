import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  makeUserMember,
  getUsers,
  getUserByID,
  deleteUserByID,
  updateUserByID,
  followUser,
  unFollowUser,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.post("/login", authUser);
router.post("/logout", protect, logoutUser);
router.put("/follow/:user", protect, followUser);
router.put("/unfollow/:user", protect, unFollowUser);
router.put("/member/:id", protect, admin, makeUserMember);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUserByID)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUserByID);

export default router;
