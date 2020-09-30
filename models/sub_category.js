const Sequelize = require('sequelize');
const sequelize = require('../utilities/database')

const SubCategory = sequelize.define('subcategories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }


});
module.exports = SubCategory;