const express = require('express');
const router = express.Router();
const QueueController = require('../controllers/queueController');

// Route untuk user detail
router.get('/users/:id', QueueController.getUserById);

// Route untuk order details
router.get('/order-details', QueueController.getOrderDetails);

// Route untuk treatment details dengan informasi terkait
router.get('/order-details/treatment', QueueController.getTreatmentDetails);

// Route untuk filter order details berdasarkan process_time
router.get('/order-details/process/:processTime', QueueController.getOrderDetailsByProcessTime);

module.exports = router;