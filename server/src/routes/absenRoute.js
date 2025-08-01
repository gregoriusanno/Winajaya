const express = require('express');
const router = express.Router();
const { getAbsenReport } = require('../controllers/absenController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/report', authenticateToken, getAbsenReport);

module.exports = router; 