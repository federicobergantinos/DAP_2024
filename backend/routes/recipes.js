const express = require('express');
const router = express.Router();

const {create, getAll, getById, searchAll} = require("../controllers/recipeController");

router.post('/', create);
router.get('/', getAll);
router.get('/search', searchAll);
router.get('/:recipeId', getById);

module.exports = router;
