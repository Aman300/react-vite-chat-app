// controller/socketController.js

const socket = require("socket.io");
const ludoGame = require("../models/chat.message");
const chatUser = require("../models/chat.user");

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
  
    socket.on("is-online",async (id) => {
      try{
        let isUserExist = await chatUser.findOneAndUpdate({_id: id}, {$set:{isOnline: true}}, {new: true})      
        console.log(`User ${isUserExist.name} Update ${isUserExist.isOnline}`);
      }catch(e){
          return errorResponse(res, 500, false, e.message)
      }      
    });

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });
  
    socket.on("send-message", (data) => {
      console.log(data);
      io.to(data.room).emit("receive-message", data); // Emit message to all clients in the specified room
    });
  
    socket.on("disconnect", () => {
      // socket.on("is-online",async (id) => {
      //   try{
          
      //     let isUserExist = await chatUser.findOneAndUpdate({_id: id}, {$set:{isOnline: false}}, {new: true})      
      //     console.log(`User ${isUserExist.name} Update ${isUserExist.isOnline}`);
      //   }catch(e){
      //       return errorResponse(res, 500, false, e.message)
      //   }      
      // });
      console.log("Disconnected from the server");
    });
  });
};
