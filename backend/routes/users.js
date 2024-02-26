const express = require("express");
const router = express.Router();

const {
  createFav,
  deleteFav,
  getFav,
  getUserInfo,
} = require("../controllers/userController");

router.post("/:userId/favorites", createFav);
router.delete("/:userId/favorites/:recipeId", deleteFav);
router.get("/:userId/favorites", getFav);
router.get("/:userId", getUserInfo);

module.exports = router;
