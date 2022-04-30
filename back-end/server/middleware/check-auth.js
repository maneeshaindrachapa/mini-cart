const jwt = require("jsonwebtoken");
const config = require("../../config.json");

module.exports = function (req, res, next) {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.env.jwt_key
    );
    req.body.user_data = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Authentication failed!" });
  }
};
