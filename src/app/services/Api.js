import axios from "axios";
import { getToken } from "./Auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:3334",
});

// api.interceptors.request.use(async (config) => {
//   const token = await getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
