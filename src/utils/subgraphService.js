/** @format */

import axios from "axios";

import { SUBGRAPH_URL } from "./common";
import { interceptor } from "./interceptor";

const instance = axios.create({
  baseURL: SUBGRAPH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//call axios interceptor
interceptor(instance);

const request = async ({ method, url, data }) => {
  const promise = instance[method](url, data);
  console.log("⚡ ~ promise:", promise);
  try {
    const response = await promise;
    console.log(response);
    const payload = response;

    return payload;
  } catch (err) {
    console.log("⚡ ~ err:", err);
    let msg = err.response?.data?.message;
    if (err.response?.data?.details) {
      msg = err.response.data.details.message;
    }
    console.log(new Error(msg));
    // throw new Error(msg);
  }
};

export const get = (url, params) => request({ method: "get", url, ...params });
export const post = (url, data, params) => request({ method: "post", url, data, ...params });
export const put = (url, data, params) => request({ method: "put", url, data, ...params });
export const patch = (url, data, params) => request({ method: "patch", url, data, ...params });
export const del = (url, data) => request({ method: "delete", url, data });
