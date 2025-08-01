const express = require('express');
const router = express.Router();
const absensiController = require('../controllers/absensiController');

// Hapus import yang tidak perlu di atas
// Perbaiki route untuk karyawan
router.get('/karyawan', absensiController.getKaryawan);
router.get('/karyawan/:id', absensiController.getKaryawanById);

module.exports = router;