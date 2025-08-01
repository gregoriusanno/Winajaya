const express = require('express');
const router = express.Router();
const KaryawanController = require('../controllers/karyawanController');

router.get('/karyawan', KaryawanController.getKaryawan);
router.get('/karyawan/:id', KaryawanController.getKaryawanById);

module.exports = router; 