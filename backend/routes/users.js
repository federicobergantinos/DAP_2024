const express = require("express");
const router = express.Router();
const { editProfile } = require("../controllers/userController");

const {
  createFav,
  deleteFav,
  getFav,
  getUser,
  editProfile,
} = require("../controllers/userController");

router.post("/:userId/favorites", createFav);
router.delete("/:userId/favorites/:recipeId", deleteFav);
router.get("/:userId/favorites", getFav);
router.get("/:userId", getUser);
router.put("/:userId", editProfile);

module.exports = router;
