const express = require('express');
const router = express.Router();
const { getCenterCode } = require("../controller/centerCodeController");

router.post("/getCenterCode", getCenterCode);

module.exports = router;
