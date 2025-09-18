const mongoose = require("mongoose");

const EmailDraftSchema = new mongoose.Schema(
  {
    subject: String,
    body: String,
    filter: Object, // JSON object to filter leads
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "sent"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const EmailDraft = mongoose.model("EmailDraft", EmailDraftSchema);
module.exports = EmailDraft;
