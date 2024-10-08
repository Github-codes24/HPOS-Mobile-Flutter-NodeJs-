const express = require('express');
const router = express.Router();
const { getCaste, getCategory, addCaste, addCategory } = require("../controller/casteAndCategory");

router.get("/getCaste", getCaste);
router.post("/addCaste", addCaste);
router.get("/getCategory", getCategory);
router.post("/addCategory", addCategory);

module.exports = router;
