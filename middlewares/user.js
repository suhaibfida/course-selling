const jwt = require("jsonwebtoken");
require("dotenv").config();
const JSecret = process.env.UserS;

function userMiddleware(req, res, next) {
  const token = req.headers.token;

  const verify = jwt.verify(token, JSecret);
  if (verify) {
    req.userId = verify.id;
  } else {
    res.json({
      message: "you are not signed up",
    });
  }

  next();
}
module.exports = {
  userMiddleware: userMiddleware,
};
