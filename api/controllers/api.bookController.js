const Book = require('../../models/book')
const Shelf = require('../../models/shelf')
const Category = require('../../models/category')
const SubCategory = require('../../models/sub_category')

exports.getBook = (req, res, next) => {
    Book.findAll()
        .then((response) => {
            res.status(200).json({
                status: true,
                message: "success",
                data: response
            })
        })
        .catch(error => {
            res.status(200).json({
                status: false,
                message: error.message

            })
        })
}
exports.postAddBook = (req, res, next) => {
    const image = req.file.path;
    const bookName = req.body.name;
    const desc = req.body.desc;
    const catId = req.body.catId
    const shelfId = req.body.shelfId;
    const subCatId = req.body.subCatId;

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

exports.putBook = (req, res, next) => {
    const id = req.body.id;
    const bookName = req.body.name;

    Book.findByPk(id)
        .then((data) => {
            if (!data) {
                res.json({
                    status: false,
                    message: "no book found"
                })
            } else {
                data.name = bookName
                return data.save()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "book updated"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message
            })
        })
}

exports.deleteBook = (req, res, next) => {
    const id = req.query.id
    if (!id) {
        res.json({
            status: false,
            message: "id required"
        })
    }
    Book.findByPk(id)
        .then((data) => {
            if (!data) {
                res.json({
                    status: false,
                    message: " No book found"
                })
            } else {
                return data.destroy()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "book deleted"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message

            })
        })
}