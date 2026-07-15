import axios from "axios";

const api = axios.create({
  baseURL: "/api/upload",
});

api.interceptors.request.use((config) => {
  console.log("API Request:", config.method, config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;