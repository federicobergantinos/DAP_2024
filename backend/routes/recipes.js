const express = require('express');
const router = express.Router();

const {create, getAll, getById} = require("../controllers/recipeController");

router.post('/', create);
router.get('/', getAll);
router.get('/:recipeId', getById);

module.exports = router;
