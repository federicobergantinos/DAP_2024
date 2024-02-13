const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database/sequelizeConnection');

const Recipe = sequelize.define('recipes', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preparationTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    servingCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false
    },
    steps: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    proteins: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totalFats: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Recipe;