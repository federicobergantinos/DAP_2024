const express = require("express");
const router = express.Router();

const {
    authenticate,
    refresh
} = require("../controllers/auth");

router.post("/", authenticate);
router.put('/',refresh)

module.exports = router;
