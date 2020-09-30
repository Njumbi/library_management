const Sequelize = require('sequelize');
const sequelize = require('../utilities/database')

const Book = sequelize.define('books', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    subCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    shelfId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});
module.exports = Book;