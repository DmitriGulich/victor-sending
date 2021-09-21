const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment.controller');

// check out 
router.post('/stripe', paymentController.stripeCheckout);



router.get('/paypalIPN', paymentController.paypalIpn);

// coinpayments
router.get('/coin', paymentController.getCoinAddress);
router.post('/coinIPN/:id', paymentController.coinIpn);

//  for test coinpayments
router.get('/cointest', paymentController.coinpyamentsTest);

// 

module.exports = router;