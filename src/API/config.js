import axios from "axios";

const localIP = "10.145.168.216";
const localPort = "8000";

export const API = axios.create({
  baseURL: `http://${localIP}:${localPort}`,
  headers: {
    "Content-Type": "text/plain"
  }
});
