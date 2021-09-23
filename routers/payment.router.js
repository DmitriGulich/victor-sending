const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');

const paymentController = require('../controllers/payment.controller');

// check out 
router.post('/stripe', paymentController.stripeCheckout);

router.get('/paypalIPN', paymentController.paypalIpn);

// coinpayments
router.get('/coin/premium', protect, paymentController.getPremiumAddress);
router.get('/coin/guest', protect, paymentController.getBillAddress);

router.post('/coinIPN/:id', paymentController.coinIpn);

//  for test coinpayments
router.get('/cointest', paymentController.coinpyamentsTest);

// 

module.exports = router;