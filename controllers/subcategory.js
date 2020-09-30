const SubCategory = require('../models/sub_category')
const Category = require('../models/category')

exports.getSubCategoryPage = (req, res, next) => {

    Category.findAll()
        .then((categorys) => {
            res.render('sub_category', {
                path: 'subcategory',
                categorys: categorys
            })
        })
        .catch(error => {
            console.log(error)
            next(error)
        })

}

exports.getSubCategoryData = (req, res, next) => {
    SubCategory.findAll({
            include: [{
                model: Category,
                as: "category"
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

exports.postSubCategory = (req, res, next) => {
    const subCategoryName = req.body.subCategoryName
    const catId = req.body.catId
    console.log('0------> ', req.body)
    SubCategory.findOne({
            where: {
                name: subCategoryName
            }
        })
        .then(subcat => {
            if (subcat) {
                res.status(200).json({
                    status: false,
                    message: "subcategory" + ' ' + subCategoryName + " already exists"
                })
            } else {
                newSubCategory = new SubCategory({
                    name: subCategoryName,
                    categoryId: catId,
                })
                newSubCategory
                    .save()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: "subcategory successfully saved"
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