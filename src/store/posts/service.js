/** @format */

import { post } from "../../utils/subgraphService";
import { SUBGRAPH_URL } from "../../utils/common";
import { getAllPosts } from "../../utils/subgraph";
import axios from "axios";

const SERVICE_URLS = {
  getAllPostsQuery: "",
};

// console.log("SUBGRAPH_URL: ", SUBGRAPH_URL);
export const getAllPostsQuery = (payload) =>
  post(SERVICE_URLS.getAllPostsQuery, {
    query: getAllPosts(payload),
  });
