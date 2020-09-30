const Book = require('../models/book')
const Shelf = require('../models/shelf')
const Category = require('../models/category')
const SubCategory = require('../models/sub_category')

exports.getBookPage = (req, res, next) => {
    // get categories
    // get sub categories
    // get shelfs
    const data = {}

    Category.findAll()
        .then(categories => {
            data.categories = categories

            return SubCategory.findAll()
        })
        .then(subcats => {
            data.subcategory = subcats;

            return Shelf.findAll()
        })
        .then(shelfs => {
            data.shelfs = shelfs

            res.render('book', {
                path: 'books',
                data: data
            })
        })
        .catch(error => {
            console.log(error)
            // next(error)
        })
}

exports.getBookData = (req, res, next) => {
    Book.findAll({
            include: [{
                model: Shelf,
                as: "shelf"
            }]
        })
        .then((data) => {
            res.status(200).json({
                draw: req.body.draw,
                recordsTotal: data.length,
                data: data
            })
        })
        .catch(error => {
            console.log(error)
        })

}
exports.postAddBook = (req, res, next) => {
    const image = req.file.path;
    const bookName = req.body.name
    const desc = req.body.desc
    const shelfId = req.body.shelfId
    const subCatId = req.body.subCatId
    const catId = req.body.catId
    console.log('-->', req.body);
    Book.findOne({
            where: {
                name: bookName
            }
        })
        .then(book => {
            if (book) {
                res.status(200).json({
                    "status": false,
                    "message": "book already exists",
                })
            } else {
                const newBook = new Book({
                    image: image,
                    name: bookName,
                    description: desc,
                    categoryId: catId,
                    subCategoryId: subCatId,
                    shelfId: shelfId,


                })
                newBook
                    .save()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "message": "book succesfully added"
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(200).json({
                            "status": false,
                            "message": error.message,
                        })
                    })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(200).json({
                "status": false,
                "message": error,
            })
        })
}