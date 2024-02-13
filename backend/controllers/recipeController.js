const {createRecipe, getRecipes} = require("../services/recipeService");
const create = async (req, res ) => {
    try {

        const recipe = await createRecipe(req.body)

        res.status(201).json(
            {
                id: recipe.id
            }
        );
    } catch (error) {
        console.error(`getResources: ${error}`);
        res.status(error.code || 500).json({
            msg: error.message || "An exception has ocurred",
        });
    }
};

const getAll = async (req, res) => {
    try {

        const recipes = await getRecipes(req.query)

        const response = recipes.map(recipe => {

            const { id, title, media } = recipe;

            const data = media.map(m => m.data);
            return {
                id,
                title,
                media: data
            };
        });
        res.status(200).json(
            response
        );
    } catch (error) {
        console.error(`getResources: ${error}`);
        res.status(error.code || 500).json({
            msg: error.message || "An exception has ocurred",
        });
    }
}

module.exports = {
    create,
    getAll
};
