import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllPostsQuery as getAllPostsQueryService } from "./service";

export const getAllPostsQuery = createAsyncThunk("posts/all", async (payload) => {
  const response = await getAllPostsQueryService(payload);
  console.log("⚡ ~ get post subgraph response: ===========", response);
  return response.posts;
});
