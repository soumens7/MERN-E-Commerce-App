import axios from "axios";

const publicAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000",
  withCredentials: false, // ✅ disable credential cookies
});

export default publicAxios;
