/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { getAllPostsQuery } from "./thunk";

const initialState = {
  posts: null,
  status: "idle", // idle, loading, success, error
  postsError: null,
  postsSuccess: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.status = "success";
    },
    setPostsError: (state, action) => {
      state.postsError = action.payload;
      state.status = "error";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPostsQuery.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllPostsQuery.fulfilled, (state, action) => {
      state.postsSuccess = true;
      state.status = "success";
      state.posts = action.payload;
    });
    builder.addCase(getAllPostsQuery.rejected, (state, action) => {
      console.log("ACTION: ", action);
      state.postsError = action.error.message;
      state.postsSuccess = false;
      state.status = "error";
    });
  },
});

export const { setPosts, setProfileError } = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export const isLoading = (state) => state.posts.status === "loading";
export default postsSlice.reducer;
