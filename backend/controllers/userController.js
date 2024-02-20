const {
  createFavorite,
  deleteFavorite,
} = require("../services/favoriteService");
const createFav = async (req, res) => {
  try {
    const { userId } = req.params;
    const recipeId = req.body.recipeId;
    const favorite = await createFavorite(userId, recipeId);
    if (favorite) {
      res.status(204).send("");
    } else {
      res.status(500).send("");
    }
  } catch (error) {
    console.error(`getResources: ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};

const deleteFav = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    const favoriteDeleted = await deleteFavorite(userId, recipeId);

    if (favoriteDeleted) {
      res.status(204).send("");
    } else {
      res.status(500).send("");
    }
  } catch (error) {
    console.error(`getResources: ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};

module.exports = {
  createFav,
  deleteFav,
};
