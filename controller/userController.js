// const express = require("express");
// const router = express.Router();
// const Data = require("../models/dataModel"); // Import Data model
// const Patient = require("../models/patientModel"); // Import Patient model

// // @route   GET /api/combined
// // @desc    Get data from both Data and Patient models
// router.get("/", async (req, res) => {
//   try {
//     // Fetch data from Data model
//     const dataRecords = await Data.find();

//     // Fetch data from Patient model
//     const patientRecords = await Patient.find();

//     // Combine both responses
//     const combinedData = {
//       dataRecords,
//       patientRecords,
//     };

//     res.json(combinedData);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;



// combineController.js
const Data = require("../models/dataModel");
const Patient = require("../models/patientModel");

exports.getCombinedData = async (req, res) => {
  try {
    // Fetch data from Data model
    const dataRecords = await Data.find();

    // Fetch data from Patient model
    const patientRecords = await Patient.find();

    // Combine both responses
    const combinedData = {
      dataRecords,
      patientRecords,
    };

    res.json(combinedData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
