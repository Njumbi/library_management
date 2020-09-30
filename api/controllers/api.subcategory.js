const SubCategory = require('../../models/sub_category')
const Category = require('../../models/category')


exports.getSubCategories = (req, res, next) => {
    SubCategory.findAll({
            include: {
                model: Category,
                as: "category"
            }
        })
        .then(response => {
            res.status(200).json({
                'status': true,
                'message': "success",
                'data': response
            })
        })
        .catch(error => {
            res.status(200).json({
                'status': false,
                'message': error.message,
                'data': null
            })

        })
}
exports.postSubCategory = (req, res, next) => {
    const subCategoryName = req.body.subCategoryName
    const catId = req.body.categoryId
    console.log("---->", req.body)
    SubCategory.findOne({
            where: {
                name: subCategoryName
            }
        })
        .then((subcat) => {
            if (subcat) {
                res.status(200).json({
                    'status': false,
                    'message': 'subcategory with that name already exists'
                })

            } else {
                const newSubCategory = new SubCategory({
                    name: subCategoryName,
                    categoryId: catId
                })
                return newSubCategory.save()
            }
        })
        .then(() => {
            res.status(200).json({
                'status': true,
                'message': 'subcategory successfully added'
            })
        })
        .catch(error => {
            res.status(200).json({
                'status': false,
                'message': error.message
            })
        })
}
exports.putSubCategory = (req, res, next) => {
    const id = req.body.id
    const name = req.body.name
    SubCategory.findByPk(id)
        .then((data) => {
            if (!data) {
                res.json({
                    status: false,
                    message: 'Category not found'
                })
            } else {
                data.name = name
                return data.save()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: " subcategory updated"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error.message

            })
        })
}
exports.deleteSubCategory = (req, res, next) => {
    const id = req.query.id
    if (!id) {
        res.json({
            status: false,
            message: "id needed"
        })
    }
    SubCategory.findByPk(id)
        .then((data) => {
            if (!data) {
                res.json({
                    status: false,
                    message: "subcategory not found"
                })
            } else {
                return data.destroy()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: "subcategory deleted"
            })
        })
        .catch(error => {
            res.json({
                status: true,
                message: error.message
            })
        })
}