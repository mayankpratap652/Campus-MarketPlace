import { io } from "socket.io-client";

const socket = io("https://campus-marketplace-0eju.onrender.com", {
  withCredentials: true,
});

export default socket;