const express = require("express");
const { userLogin, clearDatabase, userList, userDetails } = require("../../controllers/auth/auth.user");
const { loginValidation } = require("../../middleware/auth.validation");
const auth = express.Router();

auth.post("/login", loginValidation, userLogin);
auth.get("/db-clear", clearDatabase);
auth.get("/user-list", userList);
auth.get("/user-details/:id", userDetails);

module.exports = auth;