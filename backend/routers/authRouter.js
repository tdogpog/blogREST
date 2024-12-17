const { Router } = require("express");

const authRouter = Router();

authRouter.post("/", (req, res, next) => {
  // validate w/ passport
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: info?.message || "Login failed" });
    }
    // if pass the local auth passport, assign a jwt
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      token: token,
    });
  })(req, res, next);
});

module.exports = { authRouter };
