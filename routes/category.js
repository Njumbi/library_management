const express = require('express');
const routes = express.Router()

const categoryController = require('../controllers/category')

routes.get('/category', categoryController.getCategoryPage);

routes.get('/categories/data', categoryController.getCategoryData);

routes.post('/category/add', categoryController.postCategory)




module.exports = routes