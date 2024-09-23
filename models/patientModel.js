// const mongoose = require("mongoose");

// const patientSchema = new mongoose.Schema({
//   personalName: { type: String, required: true },
//   abhaNumber: { type: String, required: true, unique: true },
//   aadhaarNumber: { type: String, required: true, unique: true },
//   birthYear: { type: Number, required: true },
//   gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
//   mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
//   fathersName: { type: String, required: true },
//   maritalStatus: { type: String, required: true },
//   category: { type: String, required: true },
//   caste: { type: String, required: true },
//   subCaste: { type: String, required: true },
//   address: {
//     house: { type: String, required: true },
//     city: { type: String, required: true },
//     district: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
//   },
//   centerName: { type: String, required: true },
//   isUnderMedication: { type: Boolean, required: true },
//   isUnderBloodTransfusion: { type: Boolean, required: true },
//   familyHistory: { type: Boolean, required: true },
// });

// const Patient = mongoose.model("Patient", patientSchema);
// module.exports = Patient;






const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  // personalName: { type: String, required: true },
  // abhaNumber: { type: String, required: true, unique: true },
  // aadhaarNumber: { type: String, required: true, unique: true },
  userImage: String,
  personalName: { type: String, required: true },
  aadhaarNumber: { type: String, required: true, unique: true }, // Assuming Aadhaar number is unique
  number: { type: Number, required: true },
  birthYear: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  fathersName: { type: String, required: true },
  motherName: { type: String, required: true }, // New field added
  maritalStatus: { type: String, required: true },
  category: { type: String, required: true },
  caste: { type: String, required: true },
  subCaste: { type: String, required: true },
  address: {
    house: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
  },
  centerName: { type: String, required: true },
  isUnderMedication: { type: Boolean, required: true },
  isUnderBloodTransfusion: { type: Boolean, required: true },
  familyHistory: { type: Boolean, required: true },
  UID: { type: String },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;