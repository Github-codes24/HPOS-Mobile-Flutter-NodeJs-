const express = require("express");
const {
  createPatient,
  getAllPatients,
} = require("../controller/breastpatietController");
const router = express.Router();

router.post("/", createPatient);
router.get("/", getAllPatients);

module.exports = router;
