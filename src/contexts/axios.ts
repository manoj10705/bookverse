import axios from "axios";
console.log("🌐 Base URL:", import.meta.env.VITE_API_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookverse-1-tp4m.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
