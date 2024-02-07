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
    return {id: newUser.id, token: token.token}
};

function getToken(newUser) {
    const payload = {userId: newUser.id, email: newUser.email};
    const options = {expiresIn: '1h'};
    const token = jwt.sign(payload, process.env.CODE, options);
    return {newUser, token};
}

module.exports = {
    createUser,
};
