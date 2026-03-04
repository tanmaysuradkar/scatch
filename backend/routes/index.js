const express = require("express");
const router = express.Router();
const passport = require("passport")
const {isloggedIn,authOwer} = require("../middlewares/isLoggedIn");
const loginOrCreateUser = require("../helper/loginOrCreateUser");
const loginOrCreateOwner = require("../helper/loginOrCreateOwner");
require("./auth")
router.get("/", function (req, res) {
    res.send("hey it working")
});

router.get("/shop", function (req, res) {
  res.send("hey shop it working")
});
router.get("/auth/google", (req, res, next) => {
  req.session.role = req.query.role; // user | owner
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});
// Callback 
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.frontentURL}login` }),
  async (req, res) => {
    const role = req.session.role;

    if (role === "user") {
      const token = await loginOrCreateUser(req.user);
      return res.redirect(`${process.env.frontentURL}oauth-user?token=${token}`);
    }

    if (role === "owner") {
      const token = await loginOrCreateOwner(req.user);
      return res.redirect(`${process.env.frontentURL}oauth-owner?token=${token}`);
    }

    return res.redirect(`${process.env.frontentURL}login`);
  }
);

router.get("/auth/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});
// 
router.get("/auth/user", isloggedIn, (req, res) => {
  res.status(200).json({
    success: true,
    userInfo: req.user
  });
});
router.get("/auth/owner", authOwer, (req, res) => {
  res.status(200).json({
    success: true,
    ownerInfo: req.Owner
  });
});

module.exports = router;
