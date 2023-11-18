import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    getVerify: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/verified/${id}`,
        method: "GET",
      }),
    }),
    getSearchUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/search`,
        method: "GET",
      }),
    }),
    getUserAndPosts: builder.query({
      query: (username) => ({
        url: `${USERS_URL}/user-posts/${username}`,
        method: "GET",
      }),
    }),
    followUser: builder.mutation({
      query: (userID) => ({
        url: `${USERS_URL}/follow/${userID}`,
        method: "PUT",
      }),
    }),
    unfollowUser: builder.mutation({
      query: (userID) => ({
        url: `${USERS_URL}/unfollow/${userID}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetVerifyQuery,
  useLogoutMutation,
  useGetSearchUsersQuery,
  useGetUserAndPostsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = userApiSlice;
