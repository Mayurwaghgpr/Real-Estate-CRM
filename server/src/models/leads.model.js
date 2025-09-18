const mongoose = require("mongoose");

function generateVoucherId() {
  return `LEAD-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 6)
    .toUpperCase()}`;
}

const leadSchema = new mongoose.Schema(
  {
    voucherId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: generateVoucherId,
    },
    name: { type: String, required: true, trim: true },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      match: /^[0-9]{10,15}$/,
    },
    email: { type: String, trim: true, lowercase: true },
    source: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "lost"],
      default: "new",
    },

    propertyRequirement: {
      type: {
        type: String,
        enum: ["Residential", "Commercial", "Land"],
      },
      lookingFor: {
        type: String,
        enum: ["buy", "rent"],
      },
      category: { type: String, trim: true },
      budgetMin: { type: Number },
      budgetMax: { type: Number },
      locationPreference: {
        type: [String],
        default: [],
      },
      size: {
        type: String, // "2BHK", "1500 sq ft"
      },
    },

    interestedIn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },

    notes: { type: String, trim: true },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Agent handling the lead
    },

    isDispose: { type: Boolean, default: false },

    followUpDate: { type: Date },
  },
  { timestamps: true }
);
const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
