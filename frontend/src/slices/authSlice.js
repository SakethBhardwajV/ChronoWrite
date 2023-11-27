import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    updateStorage: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    addFollowing: (state, action) => {
      if (state.userInfo) {
        state.userInfo.following.push(action.payload);
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
    removeFollowing: (state, action) => {
      if (state.userInfo) {
        state.userInfo.following = state.userInfo.following.filter(
          (id) => id !== action.payload
        );
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  updateStorage,
  removeFollowing,
  addFollowing,
} = authSlice.actions;

export default authSlice.reducer;
