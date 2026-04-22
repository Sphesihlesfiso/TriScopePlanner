import axios from "axios";



const BASE_URL ="http://localhost:3000"
  // import.meta.env.MODE === "development"
  //   ? import.meta.env.VITE_SERVER_BASE_URL
  //   : "";
export const serverApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
