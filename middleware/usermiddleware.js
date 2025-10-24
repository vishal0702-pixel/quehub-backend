const JWT = require("jsonwebtoken");
const User = require("../models/user");
const redisclient = require("../config/redis_db");

const usermiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let payload;
    try {
      payload = JWT.verify(token, process.env.JWT_TOKEN_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const { _id } = payload;

    if (!_id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const result = await User.findById(_id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBlocked = await redisclient.exists(`token:${token}`);
    if (isBlocked) {
      return res.status(401).json({ message: "Token is blocked" });
    }

    // ✅ Attach user to request so routes can use it
    req.result = result;
    next();
  } catch (err) {
    console.error("User middleware error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = usermiddleware;
