const StudentBook = require('../../models/student_books')
const Book = require('../../models/book')

exports.getStudents = (req, res, next) => {
    StudentBook.findAll({
            include: [{
                model: Book,
                as: "student_book"
            }]
        })
        .then((response) => {
            res.json({
                status: true,
                message: "success",
                data: response
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message,
                data: null
            })
        })
}

exports.postAddStudent = (req, res, next) => {
    const studentName = req.body.name;
    const bookId = req.body.bookId

    StudentBook.findOne({
            where: {
                name: studentName,

            }
        })
        .then(student => {
            const newStudentBook = new StudentBook({
                name: studentName,
                bookId: bookId,
            })
            return newStudentBook.save()
        })
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
}
exports.putStudent = (req, res, next) => {
    const id = req.body.id;
    const studentName = req.body.name;

    Book.findByPk(id)
        .then((data) => {
            if (!data) {
                res.json({
                    status: false,
                    message: "no student found"
                })
            } else {
                data.name = studentName
                return data.save()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "student updated"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message
            })
        })
}
exports.deleteStudent = (req, res, next) => {
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
                    message: "student found"
                })
            } else {
                return data.destroy()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "student deleted"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message

            })
        })
}