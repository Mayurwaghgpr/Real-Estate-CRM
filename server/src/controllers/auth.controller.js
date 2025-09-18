const User = require("../models/user.model.js");
const { option } = require("../utils/cookiesOptions.js");
const { generateToken } = require("../utils/generateJwtToken.js");

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({
      ...req.body,
    });

    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

// Register Admin
exports.registerAdmin = async (req, res, next) => {
  try {
    const { userName, email, password, mobileNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({
      userName,
      email,
      password,
      mobileNumber,
      role: "admin",
    });

    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

// Common Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    delete user.password;
    const token = generateToken(user);
    res.status(200).cookie("token", token, option).json({ token, user });
  } catch (error) {
    next(error);
  }
};

exports.logOut = async (req, res, next) => {
  try {
    res
      .clearCookie("token", option)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
