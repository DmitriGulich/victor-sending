const express = require('express');
const router = express.Router();

const smtpController = require('../controllers/smtp.controller');

const { protect } = require('../middleware/auth');


router.get('/', protect, smtpController.getSmtp);
router.post('/', protect, smtpController.createSmtp);
router.put('/', protect, smtpController.updateSmtp);
router.post('/send', protect, smtpController.sendEmail);

module.exports = router;