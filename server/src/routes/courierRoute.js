const express = require('express');
const router = express.Router();
const courierController = require('../controllers/courierController');

// Debug middleware
router.use((req, res, next) => {
  console.log('Courier Route accessed:', {
    method: req.method,
    path: req.path,
    body: req.body
  });
  next();
});

router.post('/transport', courierController.createTransportRecord);

module.exports = router; 