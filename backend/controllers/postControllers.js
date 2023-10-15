import asyncHandler from '../middlewares/asyncHandler.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  res.json(post);
});

// @desc    Get user posts
// @route   GET /api/posts/user/:userID
// @access  Public
const getUserPosts = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const posts = await Post.find({ user: userID });

  res.json(posts);
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error('Please add a post');
  }

  const post = await Post.create({
    user: req.user._id,
    content,
  });

  if (!post) {
    res.status(400);
    throw new Error('Post data is invalid');
  }

  res.json(post);
});

// @desc    Update a user's post
// @route   PUT /api/posts/profile/:id
// @access  Private
const updateUserPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('You cannot edit this post!');
  }

  post.content = req.body.content || post.content;

  const updatedPost = await post.save();

  res.json(updatedPost);
});

// @desc    Delete a user's post
// @route   DELETE /api/posts/profile/:id
// @access  Private
const deleteUserPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('You cannot edit this post!');
  }

  await post.remove();

  res.json({ message: 'Post removed' });
});

// @desc    Get following user's posts
// @route   GET /api/posts/following
// @access  Private
const getFollowingPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('following');

  res.json(user);
});

// @desc    Like a post
// @route   PUT /api/posts/like/:id
// @access  Private
const likePost = asyncHandler(async (req, res) => {});

// @desc    Unlike a post
// @route   PUT /api/posts/unlike/:id
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {});

// @desc    Add user to post's bookmarks
// @route   PUT /api/posts/bookmark/add/:id
// @access  Private
const addBookmarks = asyncHandler(async (req, res) => {});

// @desc    Remove user to post's bookmarks
// @route   PUT /api/posts/bookmark/remove/:id
// @access  Private
const removeBookmarks = asyncHandler(async (req, res) => {});

// @desc    Get all user bookmarks
// @route   GET /api/posts/bookmarks
// @access  Private
const getAllBookmarkPosts = asyncHandler(async (req, res) => {});

// @desc    Get all user liked posts
// @route   GET /api/posts/liked
// @access  Private
const getAllLikedPosts = asyncHandler(async (req, res) => {});

// @desc    Super Like a post
// @route   PUT /api/posts/superlike/:id
// @access  Private/Member
const superLikePost = asyncHandler(async (req, res) => {});

// @desc    Super Unlike a post
// @route   PUT /api/posts/superunlike/:id
// @access  Private/Member
const superUnlikePost = asyncHandler(async (req, res) => {});

// @desc    Update post by ID
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePostByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('You cannot edit this post!');
  }

  post.content = req.body.content || post.content;

  const updatedPost = await post.save();

  res.json(updatedPost);
});

// @desc    Delete post by ID
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePostByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('You cannot delete this post!');
  }

  await post.remove();

  res.json({ message: 'Post removed' });
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
  addBookmarks,
  removeBookmarks,
  getAllBookmarkPosts,
  getAllLikedPosts,
};
