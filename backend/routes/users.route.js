const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verify,
  addOrder,
  getUserProfile,
  logoutUser,
  getOrder,
  deleteOrder
} = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/isLoggedIn");
const { validateRequest } = require("../middlewares/validateRequest");
router.get("/", function (req, res) {
  res.send("hey it's working");
});
router.post(
  "/register",
  [
    body("fullname").trim().notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validateRequest,
  registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  loginUser
);

router.post("/verify", [body("token").notEmpty().withMessage("Token required")], validateRequest, verify);
router.post("/addcart", [
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validateRequest, addOrder);

router.post("/deleteOrder", deleteOrder);

router.post("/getOrder", getOrder);

router.get("/logout", authMiddleware.isloggedIn, logoutUser);
router.post("/profile", authMiddleware.isloggedIn, getUserProfile);
module.exports = router;
