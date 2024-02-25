const express = require("express");
const router = express.Router();

const {
  createFav,
  deleteFav,
  getFav,
} = require("../controllers/userController");

router.post("/:userId/favorites", createFav);
router.delete("/:userId/favorites/:recipeId", deleteFav);
router.get("/:userId/favorites/:recipeId", getFav);

module.exports = router;