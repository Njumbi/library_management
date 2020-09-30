const Sequelize = require('sequelize');

const sequelize = require('../utilities/database');

const StudentBook = sequelize.define('student_books', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bookId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})
module.exports = StudentBook