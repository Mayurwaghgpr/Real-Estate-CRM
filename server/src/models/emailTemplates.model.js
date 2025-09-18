const mongoose = require("mongoose");

const EmailTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // user-friendly name
    subject: { type: String, required: true },
    body: { type: String, required: true }, // can include {{name}}, {{email}}, etc.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const EmailTemplate = mongoose.model("EmailTemplate", EmailTemplateSchema);
module.exports = EmailTemplate;
