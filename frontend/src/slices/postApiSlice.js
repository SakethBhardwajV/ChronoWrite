import { POSTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}`,
        method: "GET",
      }),
    }),
    getFullPostByID: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/full/${id}`,
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: "GET",
      }),
    }),
    getUserPosts: builder.query({
      query: (userID) => ({
        url: `${POSTS_URL}/user/${userID}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getFollowingUsersPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/following`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getUserLikedPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/liked`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getUserBookmarkedPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/bookmarks`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    deletePost: builder.mutation({
      query: (postID) => ({
        url: `${POSTS_URL}/profile/${postID}`,
        method: "DELETE",
      }),
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/comment`,
        method: "POST",
        body: data,
      }),
    }),
    likePost: builder.mutation({
      query: (postID) => ({
        url: `${POSTS_URL}/like/${postID}`,
        method: "PUT",
      }),
    }),
    unlikePost: builder.mutation({
      query: (postID) => ({
        url: `${POSTS_URL}/unlike/${postID}`,
        method: "PUT",
      }),
    }),
    bookmarkPost: builder.mutation({
      query: (postID) => ({
        url: `${POSTS_URL}/bookmark/add/${postID}`,
        method: "PUT",
      }),
    }),
    unbookmarkPost: builder.mutation({
      query: (postID) => ({
        url: `${POSTS_URL}/bookmark/remove/${postID}`,
        method: "PUT",
      }),
    }),
    superLikePost: builder.mutation({
      query: (postID) => ({
        url: `${POSTS_URL}/superlike/${postID}`,
        method: "PUT",
      }),
    }),
    unSuperLikePost: builder.mutation({
      query: (postID) => ({
        url: `${POSTS_URL}/unsuperlike/${postID}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetFullPostByIDQuery,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
  useGetFollowingUsersPostsQuery,
  useAddCommentMutation,
  useGetUserLikedPostsQuery,
  useGetUserBookmarkedPostsQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useBookmarkPostMutation,
  useUnbookmarkPostMutation,
  useSuperLikePostMutation,
  useUnSuperLikePostMutation,
} = postApiSlice;
