const express = require("express");
const { createData, getAllData } = require("../controller/dataController");
const router = express.Router();

router.post("/", createData);
router.get("/", getAllData);

module.exports = router;
