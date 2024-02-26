const express = require("express");
const router = express.Router();

const { createFav, deleteFav, getUser } = require("../controllers/userController");

router.post("/:userId/favorites", createFav);
router.delete("/:userId/favorites/:recipeId", deleteFav);
router.get('/:userId', getUser);

module.exports = router;
