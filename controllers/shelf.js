const Shelf = require('../models/shelf');
const SubCategory = require('../models/sub_category')

exports.getShelfPage = (req, res, next) => {
    SubCategory.findAll()
        .then((subcategorys) => {
            res.render('shelf', {
                path: 'shelf',
                subcategorys: subcategorys,
            })
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getShelfData = (req, res, next) => {
    Shelf.findAll({
            include: [{
                model: SubCategory,
                as: "sub_category"
            }]
        })
        .then(data => {
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

exports.postAddShelf = (req, res, next) => {
    const shelfName = req.body.shelfName;
    const shelfRow = req.body.shelfRow
    const subCatId = req.body.subCatId

    Shelf.findOne({
            where: {
                name: shelfName
            }
        })
        .then(shelf => {
            if (shelf) {
                res.status(200).json({
                    status: false,
                    message: "shelf" + ' ' + shelf.name + " already exists"
                })
            } else {
                newShelf = new Shelf({
                    name: shelfName,
                    shelfRow: shelfRow,
                    subCategoryId: subCatId,
                })
                newShelf
                    .save()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: "shelf successfully saved"
                        })
                    })
                    .catch(error => {
                        res.status(200).json({
                            status: false,
                            message: error.message
                        })
                    })
            }
        })
        .catch(error => {
            res.status(200).json({
                status: false,
                message: error.message
            })
        })


}