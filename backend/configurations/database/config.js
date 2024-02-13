const sequelize = require('../database/sequelizeConnection');

const { User, Recipe, Media, Tag } = require("../../entities/associateModels");

const dbConnection = async () => {
    try {
        await sequelize.sync({force: true})
        await Tag.bulkCreate([
            {title: 'Rápida prepración'},
            {title: 'Vegetariana'},
            {title: 'Vegana'},
            {title: 'Apto celiaco'},
            {title: 'Estimula sistema inmune'},
            {title: 'Promueve flora instestinal'},
            {title: 'Antiinflamatorio'},
            {title: 'Bajo en sodio'},
            {title: 'Baja en carbohidratos'}
        ])
        await sequelize.authenticate();

        console.log("Database online");
    } catch (error) {
        console.log(error);
        throw new Error("There is an error starting database");
    }
};

module.exports = {
    dbConnection,
};
