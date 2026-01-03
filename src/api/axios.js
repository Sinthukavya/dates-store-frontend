import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // optional: add /api if your backend uses it
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ must be top-level, not inside headers
});

export default api;
