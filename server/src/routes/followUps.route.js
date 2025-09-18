// routes/followUps.routes.js
const express = require("express");
const {
  createFollowUp,
  getAllFollowUps,
  getFollowUpById,
  updateFollowUp,
  deleteFollowUp,
  getTodaysFollowups,
  getNextFollowUp,
  getFollowUpsByLeadId,
  getFollowUpsByPagination,
  getFollowupsAnalytics,
  getUpcommingFollowUps,
} = require("../controllers/followUps.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

router.post("/add", isAuth, createFollowUp);
router.get("/lead/:id", getFollowUpsByLeadId);
router.get("/next/:id", getNextFollowUp);
router.get("/p", isAuth, getFollowUpsByPagination);
router.get("/analytics", isAuth, getFollowupsAnalytics);
router.get("/today", isAuth, getTodaysFollowups);
router.get("/upcomming", isAuth, getUpcommingFollowUps);
router.get("/", getAllFollowUps);
router.get("/:id", getFollowUpById);
router.put("/:id", isAuth, updateFollowUp);
router.delete("/:id", isAuth, deleteFollowUp);

module.exports = router;
