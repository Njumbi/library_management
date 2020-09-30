const Shelf = require('../../models/shelf')
const SubCategory = require('../../models/sub_category')

exports.getShelves = (req, res, next) => {
    Shelf.findAll({
            include: {
                model: SubCategory,
                as: "sub_category"
            }
        })
        .then((response) => {
            res.status(200).json({
                status: true,
                message: "success",
                data: response,
            })
        })
        .catch(error => {
            res.status(200).json({
                status: false,
                message: error.message,
                data: null,
            })
        })
}

exports.postAddShelves = (req, res, next) => {
    const name = req.body.name
    const shelfRow = req.body.shelfRow
    const id = req.body.subCategoryId

    Shelf.findOne({
            where: {
                name: name
            }
        })
        .then((shelf) => {
            if (shelf) {
                res.json({
                    status: false,
                    message: "shelf already exist"
                })
            } else {
                newShelf = new Shelf({
                    name: name,
                    shelfRow: shelfRow,
                    subCategoryId: id
                })
                return newShelf.save()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "shelf added successfully"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message
            })
        })
}

exports.putShelf = (req, res, next) => {
    const id = req.body.id;
    const shelfName = req.body.name;

    Shelf.findByPk(id)
        .then((data) => {
            if (!data) {
                res.json({
                    status: false,
                    message: "no shelf found"
                })
            } else {
                data.name = shelfName
                return data.save()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "shelf updated"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message
            })
        })
}

exports.deleteShelf = (req, res, next) => {
    const id = req.query.id
    if (!id) {
        res.json({
            status: false,
            message: "id needed"
        })
    }
    Shelf.findByPk(id)
        .then((data) => {
            if (!data) {
                res.json({
                    status: false,
                    message: "shelf not found"
                })
            } else {
                return data.destroy()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "shelf deleted"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message
            })
        })
}