/** @format */

import axios from "axios";
import { interceptor } from "./interceptor";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});
// console.log("⚡ ~ import.meta.env.:", import.meta.env);
// console.log("⚡ ~ import.meta.env.BACKEND_URL:", import.meta.env.BACKEND_URL);

interceptor(instance);

export default instance;
