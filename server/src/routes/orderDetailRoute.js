const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

// Endpoint untuk filter berdasarkan process time dan rentang tanggal
router.get('/order-details/process/:processTime', orderDetailController.getByProcessTimeAndDateRange);

// Endpoint untuk mendapatkan semua order details
router.get('/order-details', orderDetailController.getAllOrderDetails);

module.exports = router; 