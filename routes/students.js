const express = require('express');
const routes = express.Router();

const studentController = require('../controllers/students')

routes.get('/students', studentController.getStudentPage)
routes.get('/students/data', studentController.getStudentData)
routes.post('/students/add', studentController.postAddStudent)

module.exports = routes;