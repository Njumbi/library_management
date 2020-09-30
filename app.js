const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const path = require('path')
const multer = require('multer')

const app = express()
const sequelize = require('./utilities/database')

//import routes
const categoryRoutes = require('./routes/category')
const subcategoryRoutes = require('./routes/subcategory')
const shelfRoutes = require('./routes/shelf')
const bookRoutes = require('./routes/books')
const studentRoutes = require('./routes/students')
const apiRoute = require('./api/routes/api.categoryroutes');

//imports models
const Category = require('./models/category');
const SubCategory = require('./models/sub_category');
const Shelf = require('./models/shelf');
const Book = require('./models/book');
const StudentBook = require('./models/student_books');

//configure settings
// set up and configure
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false)
    }
};
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

//use Routes
app.use(categoryRoutes)
app.use(subcategoryRoutes)
app.use(shelfRoutes)
app.use(bookRoutes)
app.use(studentRoutes)
app.use('/api/v1', apiRoute)

// associations
Category.hasMany(SubCategory)
SubCategory.belongsTo(Category, {
    as: "category",
    foreignKey: "categoryId"
})
Shelf.belongsTo(SubCategory, {
    as: 'sub_category',
    foreignKey: 'subCategoryId'
})

Book.belongsTo(Shelf, {
    as: 'shelf',
    foreignKey: 'shelfId'
})
Book.belongsTo(SubCategory, {
    as: 'subCategory',
    foreignKey: 'subCategoryId'
})
Book.belongsTo(Category, {
    as: 'category',
    foreignKey: 'categoryId'
})

StudentBook.belongsTo(Book, {
    as: 'student_book',
    foreignKey: 'bookId'
})
//listen to server
sequelize.sync({

    })
    .then(() => {
        app.listen(4000, () => {
            console.log("app has started")
        })
    })
    .catch(error => {
        console.log(error)
    })