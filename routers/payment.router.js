const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment.controller');

// check out 
router.post('/stripe-checkout', paymentController.stripeCheckout);


// IPN processing
router.get('/paypalIPN', paymentController.paypalIpn);
router.get('/stripeIPN', paymentController.stripeIpn);
router.get('/coinIPN', paymentController.coinIpn);

// 