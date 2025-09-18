const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    listingType: { type: String, enum: ["sale", "rent"], required: true },
    category: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    unit: { type: String },
    amenities: [String],
    status: {
      type: String,
      enum: ["available", "under-offer", "sold", "rented"],
      default: "available",
    },
    listedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
