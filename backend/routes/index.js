const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");

router.get("/", function (req, res) {
    res.send("hey it working")
});

router.get("/shop", isloggedin, function (req, res) {
  res.send("hey shop it working")
});

module.exports = router;
