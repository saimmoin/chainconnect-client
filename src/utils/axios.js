/** @format */

import axios from "axios";
import { interceptor } from "./interceptor";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

interceptor(instance);

export default instance;
