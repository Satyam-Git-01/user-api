const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      throw new Error("No token provided");
    }
    const decodedUser = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findByPk(decodedUser.userId);
    if (!user) {
      throw new Error("No user found");
    }
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: `Auth failed due to ${err.message}` });
  }
};

module.exports = authenticate;
