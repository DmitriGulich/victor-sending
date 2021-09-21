const express = require('express');
const router = express.Router();

const templateController = require('../controllers/template.controller');

router
    .route('/')
    .get(templateController.templates)
    .post(templateController.createTemplate);

router 
    .route('/:id')
    .get(templateController.getTemplate)
    .put(templateController.updateTemplate)
    .delete(templateController.deleteTemplate);

module.exports = router;