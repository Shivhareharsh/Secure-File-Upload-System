import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

api.interceptors.request.use((config) => {
  console.log("API Request:", config.method, config.url);
  return config;
});

export default api;