const express = require('express');
const router = express.Router();
const { addSightDetail } = require('../controller/sightDetailController');
const authMiddleware = require('../middleware/auth');

// POST /api/sight-details
router.post('/sight-details', authMiddleware, addSightDetail);

module.exports = router;
