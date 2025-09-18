const express = require("express");
const {
  createStatus,
  getAllStatuses,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller.js");

const router = express.Router();

router.post("/create", createStatus);
router.get("/all", getAllStatuses);
router.put("/update/:statusId", updateStatus);
router.delete("/delete/:statusId", deleteStatus);

module.exports = router;
