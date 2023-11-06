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
    getFollowingUsersPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/following`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
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
        url: `${POSTS_URL}/bookmark/${postID}`,
        method: "PUT",
      }),
    }),
    unbookmarkPost: builder.mutation({
      query: (postID) => ({
        url: `${POSTS_URL}/unbookmark/${postID}`,
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
  useGetFollowingUsersPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useBookmarkPostMutation,
  useUnbookmarkPostMutation,
  useSuperLikePostMutation,
  useUnSuperLikePostMutation,
} = postApiSlice;
