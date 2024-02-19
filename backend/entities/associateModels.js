const User = require('./user')
const Recipe = require('./recipe')
const Media = require('./media')
const Tag = require('./tags')
const Classification = require('./classification')
const Authorization = require('./auth')
const RecipeTags = require('./recipeTags')
const Favorite = require('./Favorite')

Authorization.belongsTo(User, {as: 'user', foreignKey: 'userId'})
Recipe.hasMany(Media, { as: 'media', foreignKey: 'recipeId'})
Recipe.hasMany(Classification, {as: 'classification', foreignKey: 'recipeId'})
Recipe.belongsTo(User, {as: 'user', foreignKey: 'userId'})

User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'userId' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'recipeId' });

User.hasMany(Classification, {as: 'classification', foreignKey: 'userId'})

module.exports = { User, Recipe, Media, Tag, Classification, RecipeTags, Favorite };
