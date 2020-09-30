const Sequelize = require('sequelize');

const sequelize = require('../utilities/database');

const Category = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})
module.exports = Category