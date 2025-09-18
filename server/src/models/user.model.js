const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: Number, unique: true },
    password: { type: String, required: true },
    territory: String,
    totalDeals: { type: Number },
    totalSalesValue: { type: Number },
    commissionRate: { type: Number },
    active: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["admin", "manager", "agent"],
      default: "agent",
    },
    // companyId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Company",
    //   required: true,
    // },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
