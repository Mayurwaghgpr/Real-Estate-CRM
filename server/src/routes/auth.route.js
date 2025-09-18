// routes/auth.routes.js
const express = require("express");
const {
  registerUser,
  registerAdmin,
  login,
  logOut,
} = require("../controllers/auth.controller");

const router = express.Router();

// Separate registration routes
router.post("/register/user", registerUser);
router.post("/register/admin", registerAdmin);

// Common login route
router.post("/login", login);
router.put("/logout", logOut);

module.exports = router;
