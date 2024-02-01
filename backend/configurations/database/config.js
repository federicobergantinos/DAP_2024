const sequelize = require('../database/sequelizeConnection');
const Users = require("../../entities/user")

const dbConnection = async () => {
    try {

        await sequelize.authenticate();
        await sequelize.sync();

        console.log("Database online");
    } catch (error) {
        console.log(error);
        throw new Error("There is an error starting database");
    }
};

module.exports = {
    dbConnection,
};
