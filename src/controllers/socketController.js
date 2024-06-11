// controller/socketController.js

const socket = require("socket.io");
const ludoGame = require("../models/chat.message");

module.exports = function (server) {
  const io = socket(server, {
    cors: {
      // origin: "http://localhost:3001",
      origin: "https://ourchat-821q.onrender.com",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket", socket.id);
  
    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });
  
    socket.on("send-message", (data) => {
      console.log(data);
      io.to(data.room).emit("receive-message", data); // Emit message to all clients in the specified room
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  });
};
