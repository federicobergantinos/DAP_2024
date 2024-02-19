const { Recipe, Media, Tag, RecipeTags } = require("../../../entities/associateModels");
const { recipesData }  = require("./recipesData");

const populateRecipes = async () => {
    try {
        for (const recipeData of recipesData) {
            const { title, description, preparationTime, servingCount, ingredients, steps, calories, totalFats, proteins, image, tags } = recipeData;

            // Crear la receta (sin incluir la imagen directamente aquí)
            const recipe = await Recipe.create({
                title,
                description,
                preparationTime,
                servingCount,
                ingredients,
                steps,
                calories,
                totalFats,
                proteins
            });
            
            // Crear registro de Media para la imagen y asociarlo con la receta
            const media = await Media.create({
                data: image,
                recipeId: recipe.id // Asociar el registro de Media con la receta mediante la clave externa
            });

            // Buscar y asociar etiquetas existentes con la receta
            const tagInstances = await Promise.all(tags.map(async (tagName) => {
                // Aquí cambiamos findOrCreate por findOne ya que no queremos crear nuevas etiquetas
                const tagInstance = await Tag.findOne({
                    where: { key: tagName }
                });
                return tagInstance;
            }));

            // Filtramos cualquier instancia de etiqueta que no se haya encontrado para evitar errores
            const existingTagInstances = tagInstances.filter(tagInstance => tagInstance !== null);

            // Asociar la receta con sus etiquetas existentes
            for (const tagInstance of existingTagInstances) {
                await RecipeTags.create({
                    recipeId: recipe.id,
                    tagId: tagInstance.id
                });
            }
        }

        console.log("Recipes table has been populated with initial data.");
    } catch (error) {
        console.error("Error populating Recipes table:", error);
    }
};

module.exports = populateRecipes;
