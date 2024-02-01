const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database/sequelizeConnection');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = User;
