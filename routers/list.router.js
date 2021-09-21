const express = require('express');
const router = express.Router();

const listController = require('../controllers/list.controller');

router
    .route('/')
    .get(listController.lists)
    .post(listController.createList);

router
    .route('/:id')
    .get(listController.getList)
    .put(listController.updateList)
    .delete(listController.deleteList);