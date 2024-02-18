const User = require("../entities/user");
const BadRequest = require("../Errors/BadRequest");
const jwt = require("jsonwebtoken");
const {Recipe} = require("../entities/associateModels");
const NotFound = require("../Errors/NotFound");

const createUser = async (userData) => {
    if (await findUserByEmail(userData.email)) {
        throw new BadRequest("The user exists")
    }
    const newUser = await User.create(userData);
    const  token = getToken(newUser);
    return { id: newUser.id, accessToken: token.accessToken, refreshToken: token.refreshToken }
};

const isValidUser = async (userId) => {
    const existingUser = await User.findByPk(userId)
    return existingUser !== null
}

const findUserById = async (userId) => {
    const user = await User.findByPk(userId)
    if(user === null) {
        throw new NotFound('User not found')
    }

    return user
}

const findUserByEmail = async (email) => {
    return User.findOne({
        where: { email: email },
    });
}

function getToken(newUser) {
    const payload = {userId: newUser.id, email: newUser.email};
    const accessOptions = {expiresIn: '1h'};
    const refreshOptions = { expiresIn: "30d"}
    const accessToken = jwt.sign(payload, process.env.CODE, accessOptions);
    const refreshToken = jwt.sign(payload, process.env.CODE, refreshOptions);
    return {refreshToken, accessToken};
}

module.exports = {
    createUser,
    isValidUser,
    findUserById,
    findUserByEmail
};
