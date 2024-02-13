const express = require('express');
const router = express.Router();

const {
    signUp
} = require("../controllers/auth");

router.post('/', signUp);

module.exports = router;
