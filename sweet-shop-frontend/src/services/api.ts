import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ||"http://localhost:3000/api",
});

/* ============================
   REQUEST INTERCEPTOR
============================ */
api.interceptors.request.use(
  (config: any) => {
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
  (error: any) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
============================ */
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error?.response?.status === 401) {
      toast.error("Session expired. Please login again.");

      localStorage.clear();
      sessionStorage.clear();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
