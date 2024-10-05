/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    address: null,
    followers: [],
    following: [],
  },
  status: "idle", // idle, loading, success, error
  profileError: null,
  profileSuccess: false,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.status = "success";
    },
    setProfileError: (state, action) => {
      state.profileError = action.payload;
      state.status = "error";
      state.isAuthenticated = false;
    },
  },
});

export const { setProfile, setProfileError, setProfileSuccess } = userSlice.actions;
export const selectProfile = (state) => state.auth.profile;
export const isLoading = (state) => state.auth.status === "loading";
export const isAuthenticated = (state) => state.auth.isAuthenticated;
export default userSlice.reducer;
