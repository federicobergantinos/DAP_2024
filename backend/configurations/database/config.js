const sequelize = require('../database/sequelizeConnection');

const dbConnection = async () => {
    try {

        await sequelize.authenticate();
        await sequelize.sync({force: true})
            .then(() => {
                console.log('Tabla creada con éxito');
            })
            .catch(error => {
                console.error('Error al crear la tabla:', error);
            });

        console.log("Database online");
    } catch (error) {
        console.log(error);
        throw new Error("There is an error starting database");
    }
};

module.exports = {
    dbConnection,
};
