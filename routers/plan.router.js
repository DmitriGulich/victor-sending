const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../middleware/auth');

const planController = require('../controllers/plan.controller');

router
    .route('/')
    .get(protect, restrictTo('admin'), planController.plans)
    .post(planController.createPlan);

router
    .route('/:id')
    .put(planController.updatePlan)
    .delete(planController.deletePlan);

module.exports = router;