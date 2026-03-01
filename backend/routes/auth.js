const express = require("express");
let GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const UserModel = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://scatch-backend-g8lt.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists
        let existingUser = await UserModel.findOne({
          email: profile.emails?.[0]?.value,
        });

        if (!existingUser) {
          // create new user
          const newUser = new UserModel({
            fullname: profile.displayName,
            email: profile.emails?.[0]?.value,
            picture: profile.photos?.[0]?.value,
            isVerify: true,
          });
          let token = newUser.generateAuthToken();
          await newUser.save();
          return done(null, { userInfo: newUser, token: token });
        } else {
          const token = existingUser.generateAuthToken();
          return done(null, { userInfo: existingUser, token });
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

