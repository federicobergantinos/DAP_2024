const {
  createFavorite,
  deleteFavorite,
  getFavorites,
} = require("../services/favoriteService");
const { findUserById } = require("../services/userService");

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
    console.error(` ${error}`);
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
    console.error(` ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};

const getFav = async (req, res) => {
  try {
    // const countFav = await Favorite.count({ where: { userId } });
    const favorite = await getFavorites(req.params.userId);
    res
      .status(200)
      .json({ favorites: favorite.recipies, total: favorite.total });
  } catch (error) {
    console.error(` ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params; // Obtenemos el ID del usuario de los parámetros de la ruta
    const user = await findUserById(userId); // Usamos la función findUserById para buscar al usuario

    // Si el usuario se encuentra, devolvemos la información
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error al obtener la información del usuario: ${error}`);
    if (error.name === "NotFound") {
      res.status(404).json({ msg: error.message }); // Si el usuario no se encuentra, devolvemos un error 404
    } else {
      res.status(error.code || 500).json({
        msg: error.message || "An exception has occurred",
      });
    }
  }
};

module.exports = {
  createFav,
  deleteFav,
  getFav,
  getUserInfo,
};
