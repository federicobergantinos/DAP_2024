const User = require("../entities/user");
const BadRequest = require("../Errors/BadRequest");
const jwt = require("jsonwebtoken");

const createUser = async (userData) => {

    const existingUser = await User.findOne({
        where: {
            email: userData.email,
        },
    });

    if (existingUser) {
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
    isValidUser
};
