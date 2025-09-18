const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    teamSize: { type: String, required: true },
    industry: { type: String, default: "Real Estate" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
