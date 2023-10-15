import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostByID = asyncHandler(async (req, res) => {
  console.log("get post by id");
});

// @desc    Get user posts
// @route   GET /api/posts/:userID
// @access  Public
const getUserPosts = asyncHandler(async (req, res) => {
  console.log("get user posts");
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  console.log("create post");
});

// @desc    Update a users' post
// @route   PUT /api/posts/profile/:id
// @access  Private
const updateUserPost = asyncHandler(async (req, res) => {
  console.log("update users' post");
});

// @desc    Delete a users' post
// @route   DELETE /api/posts/profile/:id
// @access  Private
const deleteUserPost = asyncHandler(async (req, res) => {
  console.log("delete users' post");
});

// @desc    Get following users' posts
// @route   GET /api/posts/following
// @access  Private
const getFollowingPosts = asyncHandler(async (req, res) => {
  console.log("get users' following posts");
});

// @desc    Like a post
// @route   PUT /api/posts/like/:id
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  console.log("like post by id");
});

// @desc    Unlike a post
// @route   PUT /api/posts/unlike/:id
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
  console.log("unlike post by id");
});

// @desc    Super Like a post
// @route   PUT /api/posts/superlike/:id
// @access  Private/Member
const superLikePost = asyncHandler(async (req, res) => {
  console.log("superlike post by id");
});

// @desc    Super Unlike a post
// @route   PUT /api/posts/superunlike/:id
// @access  Private/Member
const superUnlikePost = asyncHandler(async (req, res) => {
  console.log("superunlike post by id");
});

// @desc    Update post by ID
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePostByID = asyncHandler(async (req, res) => {
  console.log("update post by id");
});

// @desc    Delete post by ID
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePostByID = asyncHandler(async (req, res) => {
  console.log("update post by id");
});

export {
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
};
