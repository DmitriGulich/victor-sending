const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../middleware/auth');
const quotaController = require('../controllers/quota.controller');

router
    .route('/')
    .get(protect, quotaController.quotas)
    .post(protect, restrictTo('admin'), quotaController.createQuota);

router 
    .route('/:id')
    .get(protect, quotaController.getQuota)
    .put(protect, restrictTo('admin'), quotaController.updateQuota)
    .delete(protect, restrictTo('admin'), quotaController.deleteQuota);

module.exports = router;