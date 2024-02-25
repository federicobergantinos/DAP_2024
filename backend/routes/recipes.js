const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
  create,
  getAll,
  getById,
  searchAll,
  update,
} = require("../controllers/recipeController");

router.post("/create", upload.single("image"), create);
router.get("/", getAll);
router.get("/search", searchAll);
router.get("/:recipeId", getById);
router.put("/:recipeId", upload.single("image"), update);

module.exports = router;
