const {
  createFavorite,
  deleteFavorite,
  getFavorites,
  editProfile,
} = require("../services/favoriteService");
const { findUserByEmail, findUserById } = require("../services/userService");
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
    const favorite = await getFavorites(req.params.userId)
    console.log(favorite)
    res.status(200).json({ favorites: favorite.recipies, total: favorite.total });

  } catch (error) {
    console.error(` ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error(`${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, surname } = req.body;

    // Lógica para actualizar los datos del usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(userId, { name, surname }, { new: true });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has occurred",
    });
  }
};


module.exports = {
  createFav,
  deleteFav,
  getFav, 
  getUser,
  editProfile,
};