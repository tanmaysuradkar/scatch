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
    // On success, redirect to frontend OAuth
    res.redirect(`${process.env.frontentURL}OAuth`);
  }
);

router.get("/auth/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});


router.get("/auth/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
