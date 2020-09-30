const express = require('express');

const routes = express.Router()

const subcategoryController = require('../controllers/subcategory')

routes.get('/subcategory', subcategoryController.getSubCategoryPage)

routes.get('/subcategory/data', subcategoryController.getSubCategoryData)

routes.post('/subcategory/add', subcategoryController.postSubCategory)

module.exports = routes;