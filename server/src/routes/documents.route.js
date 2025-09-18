const express = require("express");
const upload = require("../config/multer.js");
const { isAuth } = require("../middlewares/isAuth.js");
const {
  uploadDocuments,
  getDocumentsByLead,
  deleteDocument,
} = require("../controllers/documents.controller.js");
const router = express.Router();

router.post("/upload", upload.array("docs"), isAuth, uploadDocuments);
router.get("/:leadId", isAuth, getDocumentsByLead);
router.delete("/:id", isAuth, deleteDocument);

module.exports = router;
