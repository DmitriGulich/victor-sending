const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/resend', authController.resend);
router.get('/verify/:token', authController.emailVerify);

module.exports = router;