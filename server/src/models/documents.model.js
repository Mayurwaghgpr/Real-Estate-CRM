const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String, // S3/Cloudinary/local path
    required: true,
  },
  fileType: {
    type: String, // pdf, doc, jpg etc.
    required: true,
  },
  fileSize: {
    type: Number, // in bytes
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Documents = mongoose.model("Document", DocumentSchema);
module.exports = Documents;
