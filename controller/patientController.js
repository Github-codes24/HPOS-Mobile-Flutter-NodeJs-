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
  try {
    const {
      personalName,
      aadhaarNumber,
      number,
      disease,
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
      centerCode,
      isUnderMedication,
      isUnderBloodTransfusion,
      familyHistory,
    } = req.body;

    const { userImage } = req.files;
    
    // Upload the image to cloudinary if provided
    let userImageFile;
    if (userImage) {
      userImageFile = await cloudinary(userImage[0].buffer);
    }

    // Reusable UID generation logic
    const UID = aadhaarNumber.slice(0, 12) + personalName.slice(0, 3).toUpperCase() + centerName.slice(0, 3).toUpperCase();

    // Define patient data that can be used across different conditions
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

    // Create patient based on the disease type
    let newPatient;
    
    if (disease === "sickleCell") {
      newPatient = new Patient(patientData);
    } else if (disease === "breastCancer") {
      newPatient = new BPatient(patientData);
    } else if (disease === "cervicalCancer") {
      newPatient = new CPatient(patientData);
    } else if (disease === "All") {
      // Save to all collections for 'All' disease
      const newPatient = new Patient(patientData);
      const newBPatient = new BPatient(patientData);
      const newCPatient = new CPatient(patientData);
      
      await newPatient.save();
      await newBPatient.save();
      await newCPatient.save();

      return res.status(201).json({
        message: "Patient record saved successfully",
        data: { newPatient, newBPatient, newCPatient }
      });
    }

    if (newPatient) {
      await newPatient.save();
      return res.status(201).json({
        message: "Patient record saved successfully",
        data: newPatient
      });
    }

    res.status(400).json({
      message: "Invalid disease type provided"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving patient record",
      error: error.message,
    });
  }
};

// Sample function to generate random 5-digit center code if required
const generateCenterCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
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