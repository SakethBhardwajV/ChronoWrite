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
  }),
});

export const { useCreatePostMutation, useGetFollowingUsersPostsQuery } =
  postApiSlice;
