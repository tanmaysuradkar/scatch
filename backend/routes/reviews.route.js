const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validateRequest } = require("../middlewares/validateRequest");
const {
  createReview,
  deleteReview,
  getReview,
} = require("../controllers/reviews.controller");
router.get("/", function (req, res) {
  console.log("it's working on reveiews");
  res.status(200).json({message: "Hey, review routes are alive"});
});

router.post(
  "/createReview",
  [
    body("username").notEmpty().withMessage("User ID (username) is required"),
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message cannot be empty")
      .isLength({ min: 3 })
      .withMessage("Message must be at least 3 characters long"),
    body("rating")
      .notEmpty()
      .withMessage("Rating is required")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ],
  validateRequest,
  createReview
);
router.post(
  "/getReview",
  [
    body("getType")
      .notEmpty()
      .withMessage("getType is required")
      .isIn(["product", "user"])
      .withMessage("getType must be either 'product' or 'user'"),
    body("productId")
      .if(body("getType").equals("product"))
      .notEmpty()
      .withMessage("Product ID is required when getType = product"),
    body("userId")
      .if(body("getType").equals("user"))
      .notEmpty()
      .withMessage("User ID is required when getType = user"),
  ],
  validateRequest,
  getReview
);
router.post(
  "/deleteReview",
  [
    body("reviewId").notEmpty().withMessage("Review ID is required"),
    body("username")
      .notEmpty()
      .withMessage("User ID is required to verify ownership"),
  ],  
  validateRequest,
  deleteReview
);

module.exports = router;
