const mongoose = require("mongoose");
const DEAL_STAGES = [
  "contacted",
  "qualification",
  "site_visit_scheduled",
  "negotiation",
  "proposal_sent",
  "closed_won",
  "closed_lost",
];
const dealSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Agent handling the deal
    },
    stage: {
      type: String,
      enum: DEAL_STAGES,
      default: "qualification",
    },
    expectedValue: Number, // forecasted value
    finalValue: Number,
    expectedCloseDate: Date,
    actualCloseDate: Date,
    notes: { type: String, trim: true },
    history: [
      {
        action: String, // CLOSED / REOPENED / UPDATED
        previousStage: String,
        reopenedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reopenedAt: Date,
        notes: String,
      },
    ],
  },
  { timestamps: true }
);
dealSchema.index({ stage: 1, updatedAt: -1 });
module.exports = {
  Deal: mongoose.model("Deal", dealSchema),
  DEAL_STAGES,
};
