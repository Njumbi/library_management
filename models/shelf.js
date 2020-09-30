const Sequelize = require('sequelize');
const sequelize = require('../utilities/database')

const Shelf = sequelize.define('shelves', {
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
    shelfRow: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    subCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

});

module.exports = Shelf;