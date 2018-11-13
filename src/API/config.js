import axios from "axios";

// const localIP = "10.145.168.216";
// const localPort = "8000";

const address = prompt("Server address: ", "10.145.168.216:8000");

console.log(address);

if (!address) {
  window.location.reload();
}

export const API = axios.create({
  baseURL: `http://${address}`,
  headers: {
    "Content-Type": "text/plain"
  }
});
