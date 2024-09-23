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





module.exports = { createPatient, getAllPatients };