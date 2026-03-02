const express = require("express");
const router = express.Router();
const passport = require("passport")
const {isloggedIn} = require("../middlewares/isLoggedIn");
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
    failureRedirect: `${process.env.frontentURL}login`,
  }),
  (req, res) => {
    // On success, redirect to frontend OAuth
    const { token, userInfo } = req.user;
res.redirect(
  `${process.env.frontentURL}oauth?token=${token}`
);
  }
);

router.get("/auth/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});


router.get("/auth/user", isloggedIn, (req, res) => {
  res.status(200).json({
    success: true,
    userInfo: req.user
  });
});

module.exports = router;
