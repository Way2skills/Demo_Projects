import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  timeout: 12000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("decode_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const hadToken = Boolean(localStorage.getItem("decode_token"));
      localStorage.removeItem("decode_token");
      localStorage.removeItem("decode_user");
      if (hadToken) window.dispatchEvent(new Event("decode:auth-expired"));
    }
    return Promise.reject(error);
  },
);

export const getErrorMessage = (error) => {
  const detail = error.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map((item) => item.msg || String(item)).join(", ");
  if (typeof detail === "string") return detail;
  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    const apiUrl = error.config?.baseURL || api.defaults.baseURL;
    return `Cannot reach the API at ${apiUrl}. Check that the backend service and frontend proxy are running.`;
  }
  if (error.code === "ECONNABORTED") return "The API request timed out. Check the backend and try again.";
  return error.message || "Something went wrong. Please try again.";
};

export default api;
