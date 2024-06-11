const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;


const schema = new mongoose.Schema(
  {
    sender_id: {
        type: ObjectId,
        ref: "chat.user",
    },
    reciver_id:{
      type: ObjectId,
      ref: "chat.user",
    },
    msg:{
      type: String,
      default: "",
      required: true,
    },
    status:{
        type: String,
        enum:["seen","not seen"],
        required: true
    }
  },
  {
    timestamps: true,
  }
);

// Create User model
const chatMessage = mongoose.model("chat.message", schema);

module.exports = chatMessage;