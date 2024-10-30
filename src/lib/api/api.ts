// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api-daily-invoice.vercel.app", // Backend API URL
});

// Include token in authenticated requests (if using JWT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Fetch token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
