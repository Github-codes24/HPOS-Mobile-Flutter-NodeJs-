const Data = require("../models/dataModel");

// POST: Create new data
const createData = async (req, res) => {
  const { personalName, aadhaarNumber, number, centerName } = req.body;
  const newData = new Data({ personalName, aadhaarNumber, number, centerName });
  try {
    await newData.save();
    res.status(201).json({ message: "Data saved successfully", data: newData });console.log("Data saved successfully");
  } catch (error){
    res.status(500).json({ message: "Error saving data", error });
  }
  
};

// GET: Retrieve all data
const getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};

module.exports = { createData, getAllData };
