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
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getUsers).post(registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.put("/member", makeUserMember);
router
  .route("/profile")
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUserProfile);
router
  .route("/:id")
  .delete(deleteUserByID)
  .get(getUserByID)
  .put(updateUserByID);

export default router;
