const express = require('express');

const {
    createOrder,
    verifiedPayment
} = require('../controllers/paymentControllers');

const router = express.Router();

router.post('/order', createOrder);

router.post('/verify', verifiedPayment);

module.exports = router;

