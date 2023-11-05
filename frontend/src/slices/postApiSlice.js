import { POSTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFollowingUsersPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/following`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetFollowingUsersPostsQuery } = postApiSlice;
