"use client";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Attach token in every request if exists
instance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors globally
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // token invalid or expired → logout
      Cookies.remove("token");
      if (typeof window !== "undefined") {
        // redirect to login
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  },
);

// Shortcuts for API calls
const requests = {
  get: (url, config = {}) => instance.get(url, config).then((res) => res.data),
  post: (url, body = {}, config = {}) =>
    instance.post(url, body, config).then((res) => res.data),
  put: (url, body = {}, config = {}) =>
    instance.put(url, body, config).then((res) => res.data),
  patch: (url, body = {}, config = {}) =>
    instance.patch(url, body, config).then((res) => res.data),
  delete: (url, config = {}) =>
    instance.delete(url, config).then((res) => res.data),
};

export default requests;
