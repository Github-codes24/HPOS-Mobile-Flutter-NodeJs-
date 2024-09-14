const mongoose = require("mongoose");

const breastdataSchema = new mongoose.Schema({
  personalName: { type: String, required: true },
  aadhaarNumber: { type: String, required: true, unique: true }, // Assuming Aadhaar number is unique
  number: { type: Number, required: true },
  centerName: { type: String, required: true },
});

const Data = mongoose.model(" breastdata", breastdataSchema);
module.exports = Data;
