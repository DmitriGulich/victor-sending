const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const { protect } = require('../middleware/auth');

router.get('/:id', protect, userController.getUserById);


module.exports = router;