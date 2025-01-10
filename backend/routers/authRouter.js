const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authRouter = Router();

authRouter.post("/", (req, res, next) => {
  // validate w/ passport
  passport.authenticate("local", { session: false }, (err, admin, info) => {
    if (err || !admin) {
      return res.status(403).json({ message: info?.message || "Restricted" });
    }
    // if pass the local auth passport, assign a jwt
    const token = jwt.sign({ id: admin.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      token: token,
    });
  })(req, res, next);
});

module.exports = authRouter;
