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
  centerCode: { type: String },
  bloodStatus: { type: String , default: "Pending"},
  resultStatus: { type: String , default: "Pending"},
  HPLC: { type: String , default: "Pending"},
  cardStatus: { type: String , default: "Pending"},
  aadhaarNumber: { type: String, required: true, unique: true }, // Assuming Aadhaar number is unique
  number: { type: Number, required: true },
  birthYear: { type: String, required: true },
  age: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  fathersName: { type: String, required: true },
  motherName: { type: String }, // New field added
  maritalStatus: { type: String, required: true },
  category: { type: String, required: true },
  caste: { type: String, required: true },
  subCaste: { type: String },
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
  isDeleted: { type: String, default: false },
},
{ timestamps: true },
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;