const User = require("./user");
const Recipe = require("./recipe");
const Media = require("./media");
const Tag = require("./tags");
const Classification = require("./classification");
const Authorization = require("./auth");
const RecipeTags = require("./recipeTags");
const Favorite = require("./Favorite");

// Definiciones de relación existentes
Authorization.belongsTo(User, { as: "user", foreignKey: "userId" });
Recipe.hasMany(Media, { as: "media", foreignKey: "recipeId" });
Recipe.hasMany(Classification, {
  as: "classification",
  foreignKey: "recipeId",
});
Recipe.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Classification, { as: "classification", foreignKey: "userId" });

User.belongsToMany(Recipe, { through: Favorite, foreignKey: "userId" });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: "recipeId" });

Recipe.belongsToMany(Tag, {
  through: RecipeTags,
  foreignKey: "recipeId",
  otherKey: "tagId",
});
Tag.belongsToMany(Recipe, {
  through: RecipeTags,
  foreignKey: "tagId",
  otherKey: "recipeId",
});

module.exports = {
  User,
  Recipe,
  Media,
  Tag,
  Classification,
  RecipeTags,
  Favorite,
};
