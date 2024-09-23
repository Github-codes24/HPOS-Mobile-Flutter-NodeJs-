const express = require("express");
const {
  createPatient,
  getAllPatients,
} = require("../controller/patientController");
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.fields([
  { name: 'userImage', maxCount: 1 },
]), createPatient);
router.get("/", getAllPatients);

module.exports = router;
