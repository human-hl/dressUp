import axios from "axios";

const isLocal = window.location.hostname === 'localhost';

export const API_URL = isLocal
    ? "http://localhost:3000"
    : "https://8c449265fd225424-95-25-67-150.serveousercontent.com";
const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('Interceptor error:', error.response?.status);
        // Временно убрали редирект
        return Promise.reject(error);
    }
);

export default api;