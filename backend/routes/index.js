const express = require("express");
const router = express.Router();
const passport = require("passport")
require("./auth")
router.get("/", function (req, res) {
    res.send("hey it working")
});

router.get("/shop", function (req, res) {
  res.send("hey shop it working")
});
router.get('/auth/google',
  passport.authenticate('google', { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.frontentURL}Login`,
  }),
  (req, res) => {
    // On success, redirect to frontend dashboard/shop
    res.redirect(`${process.env.frontentURL}Shop`);
  }
);

router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/auth/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
