import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../config/sendEmail.js";
import Post from "../models/postModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user.isVerified) {
    res.status(400);
    throw new Error("User is not verified");
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

// @desc    Register a user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error("User already exists with this username");
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email. Please enter a valid email address");
  }

  const usernameRegex = /^[_a-zA-Z0-9][a-zA-Z0-9._]{4,15}$/;
  if (!usernameRegex.test(username)) {
    res.status(400);
    throw new Error(
      "Invalid username. Make sure it is 4-15 characters long and does not start with a number or period"
    );
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>.?/|])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>.?/|]{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400);
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  const user = await User.create({
    name,
    email,
    password,
    username,
    avatar: `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${username}`,
  });

  await sendEmail(
    req,
    res,
    email,
    "Verify your email",
    `http://localhost:5173/verify/${user._id}`
  );

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Check User is verified
// @route   GET /api/users/verified/:id
// @access  Private
const checkUserVerified = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  user.isVerified = true;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    username: updatedUser.username,
    isVerified: updatedUser.isVerified,
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user profile
// @route   DELETE /api/users/profile
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Follow user profile
// @route   PUT /api/users/follow/:user
// @access  Private
const followUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const otherUser = await User.findById(req.params.user).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!otherUser) {
    res.status(404);
    throw new Error("The User you're trying to find doesn't exist");
  }

  if (user._id === otherUser._id) {
    res.status(400);
    throw new Error("You cannot follow yourself.");
  }

  if (
    user.following.includes(otherUser._id) ||
    otherUser.followers.includes(user._id)
  ) {
    res.status(400);
    throw new Error(`You already follow ${otherUser.username}`);
  }

  user.following.push(otherUser._id);
  otherUser.followers.push(user._id);

  await user.save();
  await otherUser.save();

  res.status(200).json({ message: `Following ${otherUser.username}` });
});

// @desc    Unfollow user profile
// @route   PUT /api/users/unfollow/:user
// @access  Private
const unFollowUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const otherUser = await User.findById(req.params.user).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!otherUser) {
    res.status(404);
    throw new Error("The User you're trying to find doesn't exist");
  }

  if (
    !user.following.includes(otherUser._id) ||
    !otherUser.followers.includes(user._id)
  ) {
    res.status(400);
    throw new Error(`You are not following ${otherUser.username}`);
  }

  user.following = user.following.filter(
    (item) => item._id.toString() !== otherUser._id.toString()
  );
  otherUser.followers = otherUser.followers.filter(
    (item) => item._id.toString() !== user._id.toString()
  );

  await user.save();
  await otherUser.save();

  res.status(200).json({ message: `Unfollowed ${otherUser.username}` });
});

// @desc    Make user a member
// @route   PUT /api/users/member/:id
// @access  Private/Admin
const makeUserMember = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isMember) {
    res.status(400);
    throw new Error("User is already a member");
  }

  user.isMember = true;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    username: updatedUser.username,
  });
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Get users for search
// @route   GET /api/users/search
// @access  Private
const getSearchUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("name username avatar");
  res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user by id
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.isMember = Boolean(req.body.isBoolean);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user and posts
// @route   GET /api/users/user-posts/:username
// @access  Private
const getUserAndPosts = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select(
    "-password"
  );
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const posts = await Post.find({ user: user._id });

  res.status(200).json({ user, posts });
});

export {
  authUser,
  registerUser,
  checkUserVerified,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  followUser,
  unFollowUser,
  makeUserMember,
  getUsers,
  getSearchUsers,
  getUserByID,
  deleteUserByID,
  updateUserByID,
  getUserAndPosts,
};
