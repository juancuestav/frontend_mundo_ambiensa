import axios from "axios";

const api = axios.create({
  baseURL: "https://api.clientes.jpconstrucred.com/api", // URL base de la API
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
