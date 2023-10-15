import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  console.log("login user");
});

// @desc    Register a user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log("register user");
});

// @desc    Logout user / cleat cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  console.log("logout user");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log("register user");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("update user profile");
});

// @desc    Delete user profile
// @route   DELETE /api/users/profile
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  console.log("delete user profile");
});

// @desc    Make user a member
// @route   PUT /api/users/member
// @access  Private/Admin
const makeUserMember = asyncHandler(async (req, res) => {
  console.log("make user member");
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  console.log("get all users");
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  console.log("get user by id");
});

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserByID = asyncHandler(async (req, res) => {
  console.log("delete user by id");
});

// @desc    Update user by id
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserByID = asyncHandler(async (req, res) => {
  console.log("update user by id");
});

export {
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
};
