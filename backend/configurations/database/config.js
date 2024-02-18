const sequelize = require('../database/sequelizeConnection');

const { User, Recipe, Media, Tag, Classification, RecipeTags} = require("../../entities/associateModels");

const dbConnection = async () => {
    try {
        await User.sync();
        await Recipe.sync();
        await Media.sync();
        await Tag.sync();
        await Classification.sync();
        await RecipeTags.sync();

        /*await Tag.bulkCreate([
            {title: 'RAPID_PREPARATION'},
            {title: 'VEGETARIAN'},
            {title: 'VEGAN'},
            {title: 'GLUTEN_FREE'},
            {title: 'IMMUNE_SYSTEM'},
            {title: 'INTESTINAL_FLORA'},
            {title: 'ANTI_INFLAMMATORY'},
            {title: 'LOW_SODIUM'},
            {title: 'LOW_CARB'}
        ])*/
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
