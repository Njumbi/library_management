const express = require('express')
const routes = express.Router()

const bookController = require('../controllers/books')

routes.get('/books', bookController.getBookPage)
routes.get('/books/data', bookController.getBookData)
routes.post('/books/add', bookController.postAddBook)

module.exports = routes