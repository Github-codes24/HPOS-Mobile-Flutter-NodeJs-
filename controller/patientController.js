// const Patient = require("../models/patientModel");

// // POST: Create new patient record
// const createPatient = async (req, res) => {
//   const {
//     personalName,
//     abhaNumber,
//     aadhaarNumber,
//     birthYear,
//     gender,
//     mobileNumber,
//     fathersName,
//     maritalStatus,
//     category,
//     caste,
//     subCaste,
//     address,
//     centerName,
//     isUnderMedication,
//     isUnderBloodTransfusion,
//     familyHistory,
//   } = req.body;

//   const newPatient = new Patient({
//     personalName,
//     abhaNumber,
//     aadhaarNumber,
//     birthYear,
//     gender,
//     mobileNumber,
//     fathersName,
//     maritalStatus,
//     category,
//     caste,
//     subCaste,
//     address,
//     centerName,
//     isUnderMedication,
//     isUnderBloodTransfusion,
//     familyHistory,
//   });

//   try {
//     await newPatient.save();
//     res
//       .status(201)
//       .json({ message: "Patient record saved successfully", data: newPatient });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving patient record", error });
//   }
// };

// // GET: Retrieve all patient records
// const getAllPatients = async (req, res) => {
//   try {
//     const allPatients = await Patient.find();
//     res.json(allPatients);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving patient records", error });
//   }
// };

// module.exports = { createPatient, getAllPatients };











const Patient = require("../models/patientModel");
const BPatient = require("../models/breastpatientModel");
const CPatient = require("../models/cervicalpatientModel");

const cloudinary = require('../config/cloudinary');

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

  const { userImage } = req.files;

  let userImageFile;
        
  if (userImage) {
    userImageFile = await cloudinary(userImage[0].buffer);
  };

  await Promise.allSettled([
    userImageFile
  ]);


  const newPatient = new Patient({
    // personalName,
    // abhaNumber,
    // aadhaarNumber,
    personalName, aadhaarNumber, number,
    centerCode,
    userImage: userImageFile?.secure_url,
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
    UID: aadhaarNumber.slice(0, 12) + personalName.slice(0, 3).toUpperCase() + centerName.slice(0, 3).toUpperCase()
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


const createPatientForAllDisease = async (req, res) => {
  try {
    const {
      personalName,
      aadhaarNumber,
      number,
      birthYear,
      gender,
      mobileNumber,
      fathersName,
      motherName,
      maritalStatus,
      category,
      centerCode,
      caste,
      subCaste,
      address,
      centerName,
      isUnderMedication,
      isUnderBloodTransfusion,
      familyHistory,
    } = req.body;

    // Handle image upload using cloudinary
    const { userImage } = req.files;
    let userImageFile;
          
    if (userImage) {
      userImageFile = await cloudinary(userImage[0].buffer);
    }

    // Construct the UID (Make sure aadhaarNumber is at least 12 characters long)
    const UID = aadhaarNumber.slice(0, 12) + personalName.slice(0, 3).toUpperCase() + centerName.slice(0, 3).toUpperCase();

    // Create Patient, BPatient, and CPatient objects
    const patientData = {
      personalName,
      aadhaarNumber,
      number,
      centerCode,
      userImage: userImageFile?.secure_url,
      birthYear,
      gender,
      mobileNumber,
      fathersName,
      motherName,
      maritalStatus,
      category,
      caste,
      subCaste,
      address,
      centerName,
      isUnderMedication,
      isUnderBloodTransfusion,
      familyHistory,
      UID
    };

    const newPatient = new Patient(patientData);
    const newBPatient = new BPatient(patientData);
    const newCPatient = new CPatient(patientData);

    // Save all patients to the database
    await newPatient.save();
    await newBPatient.save();
    await newCPatient.save();

    res.status(201).json({
      message: "Patient record saved successfully",
      data: { newPatient, newBPatient, newCPatient },
    });

  } catch (error) {
    // Catch any errors and send the appropriate response
    res.status(500).json({
      message: "Error saving patient records",
      error: error.message,
    });
  }
};



module.exports = { createPatient, getAllPatients, createPatientForAllDisease };