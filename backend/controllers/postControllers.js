import asyncHandler from "../middlewares/asyncHandler.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// @desc    Get a full post by ID
// @route   GET /api/posts/full/:id
// @access  Private
const getFullPostByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const mainPost = await Post.findById(id).populate(
    "user",
    "name username _id avatar"
  );

  if (!mainPost) {
    res.status(404);
    throw new Error("Post not found");
  }

  const parentPost = await Post.findById(mainPost.parentPost).populate(
    "user",
    "name username _id avatar"
  );

  const comments = await Post.find({ parentPost: id }).populate(
    "user",
    "name username _id avatar"
  );

  res.json({
    mainPost,
    parentPost,
    comments,
  });
});

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Private
const getPostByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate(
    "user",
    "name username _id avatar"
  );

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.json(post);
});

// @desc    Get user posts
// @route   GET /api/posts/user/:userID
// @access  Private
const getUserPosts = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const posts = await Post.find({ user: userID })
    .populate("user", "name username _id avatar isMember")
    .sort({ createdAt: -1 });

  res.json(posts);
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { text: content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("Please add a post");
  }

  const post = await Post.create({
    user: req.user._id,
    content,
  });

  if (!post) {
    res.status(400);
    throw new Error("Post data is invalid");
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
    throw new Error("Post not found");
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot edit this post!");
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
    throw new Error("Post not found");
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot delete this post!");
  }

  await post.deleteOne();

  res.json({ message: "Post removed" });
});

// @desc    Get following user's posts
// @route   GET /api/posts/following
// @access  Private
const getFollowingPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const followingUsers = user.following;

  const myPosts = await Post.find({ user: req.user._id })
    .populate("user", "name username _id avatar isMember")
    .sort({ createdAt: -1 });

  let posts = [];

  for (let i = 0; i < followingUsers.length; i++) {
    const allPosts = await Post.find({ user: followingUsers[i] })
      .populate("user", "name username _id avatar isMember")
      .sort({ createdAt: -1 });
    posts = [...posts, ...allPosts];
  }

  let allPosts = [...myPosts, ...posts]
    .filter((post) => !post.parentPost)
    .sort((a, b) => b.createdAt - a.createdAt);

  res.json(allPosts);
});

// @desc    Like a post
// @route   PUT /api/posts/like/:id
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.likedBy.includes(req.user._id)) {
    res.status(400);
    throw new Error("Post already liked");
  }

  post.likedBy.push(req.user._id);

  const updatedPost = await post.save();

  res.json({ message: "Post liked", post: updatedPost });
});

// @desc    Unlike a post
// @route   PUT /api/posts/unlike/:id
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!post.likedBy.includes(req.user._id)) {
    res.status(400);
    throw new Error("Post has not been liked yet");
  }

  post.likedBy = post.likedBy.filter((like) => {
    return like.toString() !== req.user._id.toString();
  });

  const updatedPost = await post.save();

  res.json({ message: "Post unliked", post: updatedPost });
});

// @desc    Add user to post's bookmarks
// @route   PUT /api/posts/bookmark/add/:id
// @access  Private
const addBookmarks = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.bookmarkedBy.includes(req.user._id)) {
    res.status(400);
    throw new Error("Post already bookmarked");
  }

  post.bookmarkedBy.push(req.user._id);

  const updatedPost = await post.save();

  res.json({ message: "Post bookmarked", post: updatedPost });
});

// @desc    Remove user to post's bookmarks
// @route   PUT /api/posts/bookmark/remove/:id
// @access  Private
const removeBookmarks = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!post.bookmarkedBy.includes(req.user._id)) {
    res.status(400);
    throw new Error("Post has not been bookmarked yet");
  }

  post.bookmarkedBy = post.bookmarkedBy.filter((bookmark) => {
    return bookmark.toString() !== req.user._id.toString();
  });

  const updatedPost = await post.save();

  res.json({ message: "Post unbookmarked", post: updatedPost });
});

// @desc    Get all user bookmarks
// @route   GET /api/posts/bookmarks
// @access  Private
const getAllBookmarkPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ bookmarkedBy: { $in: req.user._id } })
    .populate("user", "name username _id avatar isMember")
    .sort({ createdAt: -1 });

  res.json(posts);
});

// @desc    Get all user liked posts
// @route   GET /api/posts/liked
// @access  Private
const getAllLikedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({
    $or: [{ likedBy: req.user._id }, { superLikedBy: req.user._id }],
  })
    .populate("user", "name username _id avatar isMember")
    .sort({ createdAt: -1 });

  res.json(posts);
});

// @desc    Super Like a post
// @route   PUT /api/posts/superlike/:id
// @access  Private/Member
const superLikePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.superLikedBy.includes(req.user._id)) {
    res.status(400);
    throw new Error("Post already liked");
  }

  post.superLikedBy.push(req.user._id);

  const updatedPost = await post.save();

  res.json({ message: "Post super liked", post: updatedPost });
});

// @desc    Super Unlike a post
// @route   PUT /api/posts/superunlike/:id
// @access  Private/Member
const superUnlikePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!post.superLikedBy.includes(req.user._id)) {
    res.status(400);
    throw new Error("Post has not been super liked yet");
  }

  post.superLikedBy = post.superLikedBy.filter((like) => {
    return like.toString() !== req.user._id.toString();
  });

  const updatedPost = await post.save();

  res.json({ message: "Post super unliked", post: updatedPost });
});

// @desc    Update post by ID
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePostByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot edit this post!");
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
    throw new Error("Post not found");
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot delete this post!");
  }

  await post.remove();

  res.json({ message: "Post removed" });
});

export {
  getFullPostByID,
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
