const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "7d" }
  );
};

module.exports = { generateToken };
