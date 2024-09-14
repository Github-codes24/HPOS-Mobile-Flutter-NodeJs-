const express = require('express');
const router = express.Router();
const { createData, getAllData } = require("../controller/breastdataController");

router.post("/", createData);
router.get("/", getAllData);

module.exports = router;
