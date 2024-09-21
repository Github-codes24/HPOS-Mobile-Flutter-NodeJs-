const Patient = require("../models/breastpatientModel");

// POST: Create new patient record
const createPatient = async (req, res) => {
  const {
    // personalName,
    // abhaNumber,
    // aadhaarNumber,
    personalName, aadhaarNumber, number,
    birthYear,
    gender,
    mobileNumber,
    fathersName,
    motherName, // New field added
    maritalStatus,
    category,
    caste,
    subCaste,
    address,
    centerName,
    isUnderMedication,
    isUnderBloodTransfusion,
    familyHistory,
  } = req.body;

  const newPatient = new Patient({
    // personalName,
    // abhaNumber,
    // aadhaarNumber,
    personalName, aadhaarNumber, number,
    birthYear,
    gender,
    mobileNumber,
    fathersName,
    motherName, // New field added
    maritalStatus,
    category,
    caste,
    subCaste,
    address,
    centerName,
    isUnderMedication,
    isUnderBloodTransfusion,
    familyHistory,
  });

  try {
    await newPatient.save();
    res
      .status(201)
      .json({ message: "Patient record saved successfully", data: newPatient });
  } catch (error) {
    res.status(500).json({ message: "Error saving patient record", error });
  }
};

// GET: Retrieve all patient records
const getAllPatients = async (req, res) => {
  try {
    const allPatients = await Patient.find();
    res.json(allPatients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving patient records", error });
  }
};

module.exports = { createPatient, getAllPatients };
