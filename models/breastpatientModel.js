const mongoose = require("mongoose");

const breastpatientSchema = new mongoose.Schema({
  personalName: { type: String, required: true },
  centerCode: { type: String },
  bloodStatus: { type: String , default: "Pending"},
  resultStatus: { type: String , default: "Pending"},
  HPLC: { type: String , default: "Pending"},
  cardStatus: { type: String , default: "Pending"},
  aadhaarNumber: { type: String, required: true, unique: true }, // Assuming Aadhaar number is unique
  number: { type: Number,},
  birthYear: { type: String, required: true },
  age: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  fathersName: { type: String, required: true },
  motherName: { type: String }, // New field added
  maritalStatus: { type: String, required: true },
  category: { type: String},
  caste: { type: String },
  subCaste: { type: String },
  address: {
    house: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
    landmark : {type : String, required : true}
  },
  centerName: { type: String, required: true },
  isUnderMedicationForBreast: { type: Boolean },
  isUnderBloodTransfusionForBreast: { type: Boolean },
  familyHistoryForBreast: { type: Boolean },
  UID: { type: String },
  isDeleted: { type: String, default: false },
},
{ timestamps: true },
);

const Patient = mongoose.model("breastpatient", breastpatientSchema);
module.exports = Patient;
