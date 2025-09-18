const express = require("express");
const {
  createNote,
  getNotesByLeadId,
  deleteNote,
} = require("../controllers/notes.controller.js");

const router = express.Router();

router.post("/", createNote);
router.get("/:leadId", getNotesByLeadId);
router.delete("/:id", deleteNote);

module.exports = router;
