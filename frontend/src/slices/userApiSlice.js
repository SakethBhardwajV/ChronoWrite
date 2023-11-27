import { USERS_URL, UPLOADS_URL } from "../constants.js";
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
    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
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
    getUserDetails: builder.query({
      query: () => ({
        url: `${USERS_URL}/details`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
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
    makeMember: builder.mutation({
      query: (userID) => ({
        url: `${USERS_URL}/member/${userID}`,
        method: "PUT",
      }),
    }),
    makeUnmember: builder.mutation({
      query: (userID) => ({
        url: `${USERS_URL}/unmember/${userID}`,
        method: "PUT",
      }),
    }),
    makeAdmin: builder.mutation({
      query: (userID) => ({
        url: `${USERS_URL}/admin/${userID}`,
        method: "PUT",
      }),
    }),
    removeAdmin: builder.mutation({
      query: (userID) => ({
        url: `${USERS_URL}/unadmin/${userID}`,
        method: "PUT",
      }),
    }),
    deleteUser: builder.mutation({
      query: (userID) => ({
        url: `${USERS_URL}/${userID}`,
        method: "DELETE",
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/avatar`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetVerifyQuery,
  useLogoutMutation,
  useGetAllUsersQuery,
  useGetSearchUsersQuery,
  useGetUserAndPostsQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useMakeMemberMutation,
  useMakeUnmemberMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
  useDeleteUserMutation,
  useUploadAvatarMutation,
  useUpdateAvatarMutation,
  useDeleteAccountMutation,
} = userApiSlice;
