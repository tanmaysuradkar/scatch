const express = require("express");
const router = express.Router();
const { createReview , deleteReview} = require("../controllers/reviews.controller");
router.get("/", function (req, res) {
  console.log("wehjfniwjnasnj");
  res.send("hey it's working");
});

router.post("/createReview", createReview);

router.post("/deleteReview", deleteReview);

module.exports = router;