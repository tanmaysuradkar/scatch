const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}
mongoose
  .connect(`${MONGODB_URI}`)
  .then(function () {
    dbgr("MongoDB connected");
  })
  .catch(function (err) {
    dbgr("MongoDB connection error:",err);
  });

module.exports = mongoose.connection;
