const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  personalName: { type: String, required: true },
  aadhaarNumber: { type: String, required: true, unique: true }, // Assuming Aadhaar number is unique
  number: { type: Number, required: true },
  centerName: { type: String, required: true },
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
