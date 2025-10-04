const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verify,
  addOrder,
  getUserProfile,
  logoutUser,
  getOrder,
} = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/isLoggedIn");
router.get("/", function (req, res) {
  res.send("hey it's working");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware.isloggedIn, logoutUser);
router.post("/verify", verify);
router.post("/addcart", addOrder);
router.post("/getOrder", getOrder);
router.post("/profile", authMiddleware.isloggedIn, getUserProfile);
module.exports = router;
