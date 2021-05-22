import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.BASEURL_API || "http://localhost:3001",
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers["auth-token"] = `${token}`;
  }
  return config;
});

export default api;
