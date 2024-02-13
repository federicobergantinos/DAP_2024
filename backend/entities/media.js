const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database/sequelizeConnection');

const Media = sequelize.define('media', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})

module.exports = Media;
