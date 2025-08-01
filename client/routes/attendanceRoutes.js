const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const networkCheck = require('../middleware/networkCheck');

router.post('/', networkCheck, attendanceController.createAttendance);

module.exports = router; 