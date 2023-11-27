import express from "express";
import {
  authUser,
  registerUser,
  checkUserVerified,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
  deleteUserProfile,
  makeUserMember,
  removeUserAsMember,
  getUsers,
  getSearchUsers,
  getUserDetails,
  getUserByID,
  deleteUserByID,
  updateUserByID,
  followUser,
  unFollowUser,
  getUserAndPosts,
  makeUserAdmin,
  removeUserAsAdmin,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.get("/search", protect, getSearchUsers);
router.get("/details", protect, getUserDetails);
router.post("/login", authUser);
router.get("/verified/:id", checkUserVerified);
router.post("/logout", protect, logoutUser);
router.put("/follow/:user", protect, followUser);
router.put("/unfollow/:user", protect, unFollowUser);
router.put("/member/:id", protect, admin, makeUserMember);
router.put("/unmember/:id", protect, admin, removeUserAsMember);
router.put("/admin/:id", protect, admin, makeUserAdmin);
router.put("/unadmin/:id", protect, admin, removeUserAsAdmin);
router.get("/user-posts/:username", protect, getUserAndPosts);
router.put("/profile/avatar", protect, updateUserAvatar);
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
