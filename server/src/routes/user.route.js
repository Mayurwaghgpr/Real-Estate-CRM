const express = require("express");
const {
  getAllUsers,
  getAgent,
  getAllAgent,
  updateUser,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/agents/all", getAllAgent);
router.get("/agents", getAgent);
router.put("/update/:id", updateUser);

module.exports = router;
