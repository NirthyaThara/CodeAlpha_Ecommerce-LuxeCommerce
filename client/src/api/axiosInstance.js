import axios from "axios";

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return "https://codealpha-ecommerce-luxecommerce.onrender.com/api";
  const normalizedUrl = envUrl.replace(/\/+$/, ""); // Remove trailing slashes
  return normalizedUrl.endsWith("/api") ? normalizedUrl : `${normalizedUrl}/api`;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
