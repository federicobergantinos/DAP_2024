const {createRecipe, getRecipes, getRecipe, searchRecipes} = require("../services/recipeService");
const {findUserById} = require("../services/userService");

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
    const page = parseInt(req.query.page) || 0; // Asegúrate de proporcionar un valor por defecto
    const limit = parseInt(req.query.limit) || 20; // Límite de ítems por página
    const offset = page * limit;
    const tag = req.query.tag;

    try {
        // Ajusta getRecipes para aceptar un parámetro de tag y lo usa para filtrar las recetas
        const recipes = await getRecipes({ limit, offset, tag }); // Asegúrate de que getRecipes maneje el parámetro de tag adecuadamente
        const response = recipes.map(recipe => {
            const { id, title, media, tags } = recipe;

            // Selecciona la primera imagen de media, si existe
            const firstImage = media.length > 0 ? media[0].data : '';

            // Mapea los tags a la forma deseada, por ejemplo, un arreglo de nombres de tags
            const tagsArray = tags.map(tag => tag.key);

            return {
                id,
                title,
                media: firstImage, // Solo devuelve la primera imagen
                tags: tagsArray // Incluye los tags asociados
            };
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(`getResources: ${error}`);
        res.status(error.code || 500).json({
            msg: error.message || "An exception has occurred",
        });
    }
};


const searchAll = async (req, res) => {
  const searchTerm = req.query.searchTerm || '';
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 50;
  const offset = page * limit;

  try {
    const recipes = await searchRecipes({ searchTerm, limit, offset });
    res.status(200).json(recipes);
  } catch (error) {
    console.error(`searchRecipes: ${error}`);
    res.status(500).json({
      msg: "An exception has occurred",
    });
  }
};


const getById = async (req, res) => {
    try {
        const { recipeId } = req.params;

        const recipe = await getRecipe(recipeId)
        const user = await findUserById(recipe.userId)

        recipe.username = user.name +" " + user.surname
        recipe.userImage = user.photoUrl
        const data = recipe.media.map(m => m.data);
        res.status(200).json({
            ...recipe,
            username: user.name + " " + user.surname,
            userImage: user.photoUrl,
            media: data
        })
    } catch (error) {
        console.error(`getResources: ${error}`);
        res.status(error.code || 500).json({
            msg: error.message || "An exception has ocurred",
        });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    searchAll
};
