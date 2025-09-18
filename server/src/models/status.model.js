const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  statusName: {
    type: String,
    required: true,
  },
});

const Status = mongoose.model("Status", statusSchema);
module.exports = Status;
