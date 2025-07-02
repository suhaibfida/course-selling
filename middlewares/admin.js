const jwt = require("jsonwebtoken");
require("dotenv").config();
const JSecret = process.env.AdminS;

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  console.log(token);
  const verify = jwt.verify(token, JSecret);
  if (verify) {
    req.adminId = verify.id;
    console.log("in");
  } else {
    res.json({
      message: "email or password is incorrect",
    });
  }

  next();
}
module.exports = {
  adminMiddleware: adminMiddleware,
};
