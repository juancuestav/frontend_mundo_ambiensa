import axios from "axios";

const api = axios.create({
  baseURL: "http://mundo_ambiensa.test/api", // URL base de la API
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
