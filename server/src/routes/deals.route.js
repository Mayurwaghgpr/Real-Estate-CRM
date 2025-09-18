const express = require("express");
const {
  createDeal,
  getAllDeals,
  getBoard,
  updateStage,
  updateDeal,
  reopenDeal,
  getDealById,
} = require("../controllers/deals.controller.js");
const { isAuth } = require("../middlewares/isAuth.js");
const upload = require("../config/multer.js");
const router = express.Router();

router.post("/create", isAuth, createDeal);
router.get("/board", isAuth, getBoard);
router.get("/deal/:id", getDealById);
router.get("/", getAllDeals);
router.put("/:dealId/reopen", isAuth, reopenDeal);
router.patch("/:id/stage", updateStage);
router.patch("/:id", updateDeal);

module.exports = router;
