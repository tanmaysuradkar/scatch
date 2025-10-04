const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors")
require("dotenv").config();
const passport = require("passport")

const ownersRouter = require("./routes/owners.route");
const productsRouter = require("./routes/products.route");
const usersRouter = require("./routes/users.route");
const reviewsRouter = require("./routes/reviews.route");
const indexRouter = require("./routes/index");

const db = require("./config/mongoose-connection");

app.use(
  session({
    secret: "tanmayLoveSecret", // 💞 change this to something private
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // use true if https
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: `${process.env.frontentURL}`, // my frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/reviews", reviewsRouter);
app.listen(4000);



