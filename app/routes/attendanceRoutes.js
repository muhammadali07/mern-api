const express = require('express');
const { clockIn, clockOut } = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/clock-in', authMiddleware, clockIn);
router.post('/clock-out', authMiddleware, clockOut);
router.get('/report', authMiddleware, getAttendanceReport);

module.exports = router;