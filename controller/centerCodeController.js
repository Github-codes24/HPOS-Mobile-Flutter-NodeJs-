const centerCodeModel = require("../models/centerCodeModel");

const getCenterCode = async (req, res) => {
    try {
        const {centerName} = req.body;

        // Check if the centerName already exists in the database
        const existingCenterName = await centerCodeModel.findOne({ centerName });
        if (!existingCenterName) {
        return res.status(404).json({
            message: "Center name not found",
        });
        }

        return res.status(201).json({
            message: "Center code fetched successfully",
            centerName: existingCenterName.centerName, centerCode: existingCenterName.centerCode
          });
    } catch (error) {
    return res.status(500).json({
      message: "Error updating patient data",
      error: error.message,
    });
  }
};

module.exports = {getCenterCode};
