//overarching imports
const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");
//passport
const passport = require("passport");
const { passportConfig } = require("./util/passportConfig");
//routers
const postRouter = require("./controllers/postRouter");
const authRouter = require("./controllers/authRouter");
const adminRouter = require("./controllers/adminRouter");

//app start
const app = express();

//general middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//session
app.use(
  session({ secret: "secretKey", resave: false, saveUninitialized: false })
);
app.use(passport.session());
passportConfig(passport);

app.use("/posts", postRouter); //public route
app.use("/auth", authRouter); //admin login (local strat with jwt)
app.use("/admin", adminRouter); // jwt admin routes

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Launched in port: ${port}`);
});
