const express = require("express");
const router = express.Router();

const { authenticate } = require("../controllers/auth");

router.post("/", authenticate);

module.exports = router;
