import axios from "axios";
import toast from "react-hot-toast";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

/* ============================
   REQUEST INTERCEPTOR
   Attach JWT token
============================ */
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
   Handle auth expiry
============================ */
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

