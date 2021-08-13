const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');

const adminController = require('../controllers/admin.controller');

router.get('/users', protect, restrictTo('admin'), adminController.getUsers);

module.exports = router;
