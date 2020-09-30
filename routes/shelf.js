const express = require('express');
const routes = express.Router()

const shelfController = require('../controllers/shelf');

routes.get('/shelf', shelfController.getShelfPage);

routes.get('/shelf/data', shelfController.getShelfData);

routes.post('/shelf/add', shelfController.postAddShelf)


module.exports = routes;