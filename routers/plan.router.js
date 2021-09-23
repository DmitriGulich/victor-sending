const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../middleware/auth');

const planController = require('../controllers/plan.controller');

router
    .route('/')
    .get(protect, planController.plans)
    .post(protect, restrictTo('admin'), planController.createPlan);

router
    .route('/:id')
    .put(protect, restrictTo('admin'), planController.updatePlan)
    .delete(protect, restrictTo('admin'), planController.deletePlan);

module.exports = router;