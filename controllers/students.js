const StudentBook = require('../models/student_books')
const Book = require('../models/book')

exports.getStudentPage = (req, res, next) => {
    Book.findAll()
        .then((books) => {
            res.render('student_books', {
                path: 'book',
                books: books,
            })
        })
        .catch(error => {
            console.log(error)
        })
}
exports.getStudentData = (req, res, next) => {
    StudentBook.findAll({
            include: [{
                model: Book,
                as: "student_book"
            }]
        })
        .then(data => {
            res.status(200).json({
                draw: req.draw,
                recordsTotal: data.length,
                data: data

            })
        })
        .catch(error => {
            console.log(error)
        })
}
exports.postAddStudent = (req, res, next) => {
    const name = req.body.name
    const bookId = req.body.bookId

    StudentBook.findOne({
            where: {
                name: name,

            }
        })
        .then(student => {
            const newStudentBook = new StudentBook({
                name: name,
                bookId: bookId,
            })
            newStudentBook.save()
                .then(() => {
                    res.status(200).json({
                        status: true,
                        message: "student loaned book"

                    })
                })
                .catch(error => {
                    res.status(200).json({
                        status: false,
                        message: error.message
                    })
                })

        })

        .catch(error => {
            res.status(200).json({
                status: false,
                message: error.message
            })
        })

}