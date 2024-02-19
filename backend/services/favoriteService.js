const {Favorite} = require("../entities/associateModels");
const BadRequest = require("../Errors/BadRequest");
const createFavorite = async (userId, recipeId) => {

    const favorite = await Favorite.findOne({ where: { userId, recipeId } });

    if(favorite !== null) {
        throw new BadRequest("Is liked")
    }

    return Favorite.create({
        userId: userId,
        recipeId: recipeId})
}

const deleteFavorite = async (userId, recipeId) => {
    return Favorite.destroy({
        where: { userId, recipeId }
    });
}

module.exports = {createFavorite, deleteFavorite};
