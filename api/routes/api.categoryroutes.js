const route = require('express').Router()

const controller = require('../controllers/api.categorycontroller')
const subcategoryController = require('../controllers/api.subcategory')
const shelfController = require('../controllers/api.shelfcontroller')
const booksController = require('../controllers/api.bookController')
const studentController = require('../controllers/api.studentController')



//  categories
route.get('/categories', controller.getCategories)
route.post('/categories', controller.postCategory)
route.put('/categories', controller.putCategory)
route.delete('/categories', controller.deleteCategory)


route.get('/subcategory', subcategoryController.getSubCategories)
route.post('/subcategory', subcategoryController.postSubCategory)
route.put('/subcategory', subcategoryController.putSubCategory)
route.delete('/subcategory', subcategoryController.deleteSubCategory)


route.get('/shelf', shelfController.getShelves)
route.post('/shelf', shelfController.postAddShelves)
route.put('/shelf', shelfController.putShelf)
route.delete('/shelf', shelfController.deleteShelf)

route.get('/book', booksController.getBook)
route.post('/book', booksController.postAddBook)
route.put('/book', booksController.putBook)
route.delete('/book', booksController.deleteBook)


route.get('/student', studentController.getStudents)
route.post('/student', studentController.postAddStudent)
route.put('/student', studentController.putStudent)
route.delete('/student', studentController.deleteStudent)

module.exports = route