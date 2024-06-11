const express = require("express");
const auth = require("./auth/auth");
const message = require("./message/message");
const router = express.Router();

router.use("/auth", auth);
router.use("/message", message);


router.all("*", async (req, res) => {
    let time = new Date();
    let Data = `${time}`;
    res.status(404).json({ status: false, message: "Page not found", Data });
  });
  

module.exports = router;