const express = require("express");
const router = express.Router();

const {
  createFav,
  deleteFav,
  getFav,
  getUser,
} = require("../controllers/userController");

router.post("/:userId/favorites", createFav);
router.delete("/:userId/favorites/:recipeId", deleteFav);
router.get("/:userId/favorites", getFav);
router.get('/:userId', getUser);

module.exports = router;