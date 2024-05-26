import axios from "axios";
import config from "../config.json";

export default axios.create({
  baseURL: "https://cartswipe-backend.onrender.com/api",
});
