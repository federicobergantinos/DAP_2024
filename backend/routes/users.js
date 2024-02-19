const express = require('express');
const router = express.Router();

const {createFav, deleteFav} = require("../controllers/userController");

router.post('/:userId/favorites', createFav);
router.delete('/:userId/favorites/:recipeId', deleteFav);

module.exports = router;
