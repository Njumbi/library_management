const Category = require('../models/category')

exports.getCategoryPage = (req, res, next) => {
    res.render('category', {
        path: 'category'
    })
}
exports.getCategoryData = (req, res, next) => {
    Category.findAll()
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
exports.postCategory = (req, res, next) => {
    const categoryName = req.body.categoryName;
    Category.findOne({
            where: {
                name: categoryName
            }
        })
        .then(category => {
            if (category) {
                res.status(200).json({
                    "status": false,
                    "message": "category already exists",
                })
            } else {
                const newCategory = new Category({
                    name: categoryName
                })
                newCategory
                    .save()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "message": "category succesfully added"
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