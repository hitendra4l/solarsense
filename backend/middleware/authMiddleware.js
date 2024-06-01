const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authGuard = async (req, _, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      next(error);
    }
  } else {
    const err = new Error("Not authorized, no token...");
    err.statusCode = 401;
    next(err);
  }
};

module.exports = { authGuard };
