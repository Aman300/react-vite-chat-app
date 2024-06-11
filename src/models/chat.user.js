const mongoose = require("mongoose");

// Define User Schema
const schema = new mongoose.Schema(
  {
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: Number,
        required: true,
        trim: true,
    },   
    profile:{
        type: String,
        default: null,
        trim: true,
    },
    name:{
        type: String,
        trim: true,
    },
    token: {
        type: String,
        default: ""
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate random name or profile if not provided
schema.pre('save', function(next) {
  if (!this.name) {
    this.name = generateRandomName();
  }
  if (!this.profile) {
    this.profile = generateRandomProfile();
  }
  next();
});

// Generate random name with exactly 6 characters
function generateRandomName() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomName = '';
  
    for (let i = 0; i < 6; i++) {
      randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return randomName;
  }
  
  

// Generate random profile with a random number between 1 to 99 at the end
function generateRandomProfile() {
    const randomNumber = Math.floor(Math.random() * 99) + 1;
    return `https://avatar.iran.liara.run/public/${randomNumber}`;
  }
  
// Create User model
const chatUser = mongoose.model("chat.user", schema);

module.exports = chatUser;
