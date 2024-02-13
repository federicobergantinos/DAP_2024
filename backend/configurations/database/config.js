const sequelize = require('../database/sequelizeConnection');

const { User, Recipe, Media, Tag, Classification, RecipeTags} = require("../../entities/associateModels");

const dbConnection = async () => {
    try {
        await User.sync({ force: true });
        await Recipe.sync({ force: true });
        await Media.sync({ force: true });
        await Tag.sync({ force: true });
        await Classification.sync({ force: true });
        await RecipeTags.sync({ force: true });

        await Tag.bulkCreate([
            {title: 'RAPID_PREPARATION'},
            {title: 'VEGETARIAN'},
            {title: 'VEGAN'},
            {title: 'GLUTEN_FREE'},
            {title: 'IMMUNE_SYSTEM'},
            {title: 'INTESTINAL_FLORA'},
            {title: 'ANTI_INFLAMMATORY'},
            {title: 'LOW_SODIUM'},
            {title: 'LOW_CARB'}
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
