import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect
const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select(
        "-password -isVerified -isAdmin"
      );
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin

const admin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
});

// Member

const member = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.isMember || user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as member, you need to subscribe");
  }
});

// Verified

const verified = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.isVerified) {
    next();
  } else {
    res.status(401);
    throw new Error("Your email is not verified");
  }
});

export { protect, admin, member };
