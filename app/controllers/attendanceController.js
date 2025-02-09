const { Attendance } = require('../models/Attendance');
exports.clockIn = async (req, res) => {
  try {
    const attendance = await Attendance.create({ userId: req.user.id, clockIn: new Date() });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clockOut = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ where: { userId: req.user.id, clockOut: null } });
    if (!attendance) return res.status(400).json({ message: 'Not clocked in' });
    attendance.clockOut = new Date();
    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const esClient = require('../config/elasticsearch');

exports.getAttendanceReport = async (req, res) => {
  try {
    const { query } = req.query;
    const { body } = await esClient.search({
      index: 'attendance',
      body: { query: { match: { userId: query } } }
    });
    res.json(body.hits.hits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getAttendanceReport = async (req, res) => {
//   try {
//     // Implementasi logika mendapatkan laporan absensi
//     res.json({ message: "Laporan absensi berhasil diambil" });
//   } catch (error) {
//     res.status(500).json({ error: "Terjadi kesalahan dalam mengambil laporan" });
//   }
// };

// module.exports = { getAttendanceReport };
