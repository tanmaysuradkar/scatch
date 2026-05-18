const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

// const MONGODB_URI = process.env.MONGODB_URI;
// if (!MONGODB_URI) {
//   throw new Error("MONGODB_URI is not defined");
// }

mongoose
  .connect("mongodb://127.0.0.1:27017/scatch")
  .then(() => {
    dbgr("MongoDB connected:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", MONGODB_URI);
  });

module.exports = mongoose.connection;