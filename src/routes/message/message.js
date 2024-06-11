const express = require("express");
const { createGame, gameOpen, gameDelete } = require("../../controllers/message/chat.message");
const message = express.Router();

message.post("/message/:id", createGame);
message.get("/message", gameOpen);
message.delete("/message/:id", gameDelete);

module.exports = message;