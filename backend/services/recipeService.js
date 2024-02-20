const {
  Media,
  Tag,
  Recipe,
  RecipeTags,
  User,
} = require("../entities/associateModels");
const BadRequest = require("../Errors/BadRequest");
const { isValidUser } = require("./userService");
const NotFound = require("../Errors/NotFound");
const { Op } = require("sequelize");

// const createRecipe = async (recipeData) => {
//   const {
//     userId,
//     title,
//     media,
//     preparationTime,
//     servingCount,
//     ingredients,
//     steps,
//     tags,
//     calories,
//     proteins,
//     totalFats,
//   } = recipeData;

//   if (!(await isValidUser(userId))) {
//     throw new BadRequest("Invalid User");
//   }

//   const newRecipe = await Recipe.create({
//     title: title,
//     preparationTime: preparationTime,
//     servingCount: servingCount,
//     ingredients: ingredients.join("|"),
//     steps: steps.join("|"),
//     calories: calories,
//     proteins: proteins,
//     totalFats: totalFats,
//     userId: userId,
//   });

//   const recipeTagsIds = await Tag.findAll({
//     where: {
//       title: tags,
//     },
//     attributes: ["id"],
//   });

//   media.forEach((it) => Media.create({ recipeId: newRecipe.id, data: it }));

//   recipeTagsIds.forEach((it) => {
//     console.log(it.id);
//     RecipeTags.create({ recipeId: newRecipe.id, tagId: it.id });
//   });

//   return newRecipe.id;
// };

// Función para crear una receta y asociarla con tags y medios
const createRecipe = async (recipeData) => {
  const {
    userId,
    title,
    description,
    preparationTime,
    servingCount,
    ingredients,
    steps,
    calories,
    proteins,
    totalFats,
    tags, // Este será un array de nombres de tags
    video,
  } = recipeData;

  // Verificar si el usuario es válido
  if (!(await isValidUser(userId))) {
    throw new BadRequest("Invalid User");
  }

  // Convertir arrays a strings para almacenamiento
  const ingredientsString = ingredients.join("|");
  const stepsString = steps.join("|");

  // Crear la receta
  const recipe = await Recipe.create({
    userId,
    title,
    description,
    preparationTime,
    servingCount,
    ingredients: ingredientsString,
    steps: stepsString,
    calories,
    proteins,
    totalFats,
  });

  // Si se proporcionó una URL de YouTube, guardarla en media
  if (video) {
    await Media.create({
      recipeId: recipe.id,
      data: video,
    });
  }

  if (tags && tags.length > 0) {
    const tagsPromises = tags.map(async (tagName) => {
      const tag = await Tag.findOne({
        where: { key: tagName },
      });
      if (tag) {
        await RecipeTags.create({
          recipeId: recipe.id,
          tagId: tag.id,
        });
      }
    });

    await Promise.all(tagsPromises);
  }

  return recipe.id;
};

const getRecipes = async (queryData) => {
  // Inicializa las opciones de inclusión con relaciones que siempre se incluirán
  let includeOptions = [
    {
      model: Media,
      as: "media",
      attributes: ["data"],
    },
    {
      model: Tag,
      as: "tags",
      through: { attributes: [] },
    },
  ];

  // Si se proporcionó un tag, ajusta la consulta para filtrar por ese tag
  if (queryData.tag) {
    includeOptions.push({
      model: Tag,
      as: "tags",
      where: { key: queryData.tag },
      required: true, // Asegura que solo se retornen recetas que tengan el tag especificado
    });
  }

  // Realiza la consulta con las opciones de inclusión
  const recipes = await Recipe.findAll({
    limit: queryData.limit,
    offset: queryData.offset,
    include: includeOptions,
  });

  return recipes;
};

const searchRecipes = async ({ searchTerm, limit, offset }) => {
  const recipes = await Recipe.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: `%${searchTerm}%` } },
        { ingredients: { [Op.iLike]: `%${searchTerm}%` } },
      ],
    },
    limit,
    offset,
    include: [
      {
        model: Media,
        as: "media",
        attributes: ["data"], // Asegúrate de que 'data' contiene la URL o referencia de la imagen
        limit: 1, // Intenta limitar a 1 el resultado de media directamente en la consulta
      },
    ],
  });

  return recipes.map((recipe) => {
    // Asumiendo que `media` es un array, incluso si limitas los resultados en la consulta
    const firstImage = recipe.media.length > 0 ? recipe.media[0].data : null;

    return {
      id: recipe.id,
      title: recipe.title,
      media: firstImage,
      description: recipe.description,
    };
  });
};

const getRecipe = async (recipeId) => {
  const recipe = await Recipe.findByPk(recipeId, {
    include: [
      {
        model: Media,
        as: "media",
        attributes: ["data"],
      },
    ],
  });
  console.log(recipeId);
  if (recipe === null) {
    throw new NotFound("Recipe not found");
  }

  const recipeTags = await RecipeTags.findAll({
    where: { recipeId },
    attributes: ["tagId"],
  });
  const tagIds = recipeTags.map((recipeTag) => recipeTag.tagId);
  const tags = await Tag.findAll({
    where: { id: tagIds },
    attributes: ["key"],
  });

  recipe.steps = recipe.steps.split("|");
  recipe.ingredients = recipe.ingredients.split("|");
  recipe.dataValues.tags = tags.map((t) => t.key);

  return recipe.dataValues;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipe,
  searchRecipes,
};
