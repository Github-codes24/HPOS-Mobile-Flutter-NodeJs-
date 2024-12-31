const express = require("express");
const {
  createPatientForMany,
  getAllPatients,
  getPatientById,
} = require("../controller/patientController");
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.fields([
  { name: 'userImage', maxCount: 1 },
]), createPatientForMany);

router.get("/patient/:id", getPatientById);

router.get("/", getAllPatients);

module.exports = router;
