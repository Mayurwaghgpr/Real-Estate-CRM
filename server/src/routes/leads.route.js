const express = require("express");
const {
  createLead,
  getAllLeads,
  updateLeadStatus,
  getPagintedLeads,
  updateLead,
  toggelIsDisposeLead,
  getPagintedDisposedLeads,
  getLeadById,
  exportLeadsExcel,
  importLeadsExcel,
} = require("../controllers/leads.controller");
const { isAuth } = require("../middlewares/isAuth");
const { checkRole } = require("../middlewares/checkRole");
const upload = require("../config/multer");
const router = express.Router();

router.post("/create", createLead);
router.post("/import/excel", upload.single("file"), importLeadsExcel);
router.get("/all", getAllLeads);
router.get("/p", isAuth, getPagintedLeads);
router.get("/lead/:id", getLeadById);
router.get("/disposed", isAuth, checkRole(["admin"]), getPagintedDisposedLeads);
router.get("/export/excel", exportLeadsExcel);
router.put("/update/:id", updateLead);
router.patch("/status/:id", updateLeadStatus);
router.patch("/dispose/:id", toggelIsDisposeLead);

module.exports = router;
