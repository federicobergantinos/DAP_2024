const {Media, Tag, Recipe, RecipeTags, User} = require("../entities/associateModels");
const BadRequest = require("../Errors/BadRequest");
const {isValidUser} = require("./userService");
const NotFound = require("../Errors/NotFound");
const {getAssociateTags} = require("../entities/recipeTags");

const createRecipe = async (recipeData) => {

    const { userId, title, media, preparationTime, servingCount, ingredients, steps, tags, calories, proteins, totalFats } = recipeData;

    if(!await isValidUser(userId)) {
        throw new BadRequest("Invalid User")
    }

    const newRecipe = await Recipe.create({
        title: title,
        preparationTime: preparationTime,
        servingCount: servingCount,
        ingredients: ingredients.join('|'),
        steps: steps.join('|'),
        calories: calories,
        proteins: proteins,
        totalFats: totalFats,
        userId: userId
    });

    const recipeTagsIds = await Tag.findAll({
        where: {
            title: tags
        },
        attributes: ['id']
    });

    media.forEach(it => Media.create({recipeId: newRecipe.id, data: it}))

    recipeTagsIds.forEach( it => {
        console.log(it.id)
        RecipeTags.create({recipeId: newRecipe.id, tagId: it.id})
    })

    return newRecipe.id
};

const getRecipes = async (queryData) => {
    const recipes = await Recipe.findAll({
        limit: queryData.limit,
        offset: queryData.offset,
        include: [{
            model: Media,
            as: 'media',
            attributes: ['data']
        }]
    });

    return recipes
}

const getRecipe = async (recipeId) => {
    const recipe = await Recipe.findByPk(recipeId, {
        include: [{
            model: Media,
            as: 'media',
            attributes: ['data']
        }]
    })
    console.log(recipeId)
    if(recipe === null) {
        throw new NotFound('Recipe not found')
    }

    const recipeTags = await RecipeTags.findAll({
        where: { recipeId },
        attributes: ['tagId']
    });
    const tagIds = recipeTags.map(recipeTag => recipeTag.tagId);
    const tags = await Tag.findAll({
        where: { id: tagIds },
        attributes: ['title']
    });

    console.log(tags)

    recipe.steps = recipe.steps.split('|')
    recipe.ingredients = recipe.ingredients.split('|')
    recipe.dataValues.tags = tags.map(t => t.title)

    return recipe.dataValues
}



module.exports = {
    createRecipe,
    getRecipes,
    getRecipe
};
