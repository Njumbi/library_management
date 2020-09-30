const Category = require('../../models/category')
const SubCategory = require('../../models/sub_category')

exports.getCategories = (req, res, next) => {
    Category.findAll({
            include: [{
                model: SubCategory
            }]
        })
        .then(response => {
            res.status(200).json({
                'status': true,
                'message': 'Succcess',
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

exports.postCategory = (req, res, next) => {
    const categoryName = req.body.name;
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


exports.putCategory = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;

    // get category using id
    Category.findByPk(id)
        .then(data => {
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
                message: 'Category name updated'
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: error
            })
        })
}

exports.deleteCategory = (req, res, next) => {
    const id = req.query.id;
    if (!id) {
        res.json({
            status: false,
            message: 'Id needed'
        })
        return
    }

    Category.findByPk(id)
        .then(data => {
            if (!data) {
                res.json({
                    status: false,
                    message: 'Category not found'
                })
            } else {
                return data.destroy()
            }
        })
        .then(() => {
            res.json({
                status: true,
                message: 'Deleted successfully'
            })
        })
        .catch(e => {
            res.json({
                status: false,
                message: e
            })
        })
}