const User = require('./user')
const Recipe = require('./recipe')
const Media = require('./media')
const Tag = require('./tags')
const Classification = require('./classification')
const Authorization = require('./auth')
const RecipeTags = require('./recipeTags')

Authorization.belongsTo(User, {as: 'user', foreignKey: 'userId'})
Recipe.hasMany(Media, { as: 'media', foreignKey: 'recipeId'})
Recipe.hasMany(Classification, {as: 'classification', foreignKey: 'recipeId'})
Recipe.belongsTo(User, {as: 'user', foreignKey: 'userId'})

User.hasMany(Classification, {as: 'classification', foreignKey: 'userId'})

module.exports = { User, Recipe, Media, Tag, Classification, RecipeTags };
