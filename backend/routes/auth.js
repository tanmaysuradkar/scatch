const express = require("express");
let GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const router = express.Router();
const UserModel = require("../models/user-model ")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists
        let existingUser = await UserModel.findOne({ email: profile.emails?.[0]?.value });

        if (!existingUser) {
          // create new user
          const newUser = new UserModel({
            fullname: profile.displayName,
            email: profile.emails?.[0]?.value,
            picture: profile.photos?.[0]?.value,
            isVerify:true
          });

          await newUser.save();
          return done(null, newUser);
        } else {
          // user already exists
          return done(null, existingUser);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = router;
