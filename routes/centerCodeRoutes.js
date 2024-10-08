const express = require('express');
const router = express.Router();
const { getCenterCode, getCenterName } = require("../controller/centerCodeController");

router.post("/getCenterCode", getCenterCode);
router.get("/getCenterName", getCenterName);

module.exports = router;
