const {OAuth2Client} = require('google-auth-library');
const jwt = require("jsonwebtoken");
const Authorization = require("../entities/auth");
const Unauthorized = require("../Errors/Unauthorized");
const client = new OAuth2Client();

const createAuthTokens = (user) => {
    const payload = {userId: user.id, email: user.email};
    const accessOptions = {expiresIn: '1h'};
    const refreshOptions = { expiresIn: "30d"}
    const accessToken = jwt.sign(payload, process.env.CODE, accessOptions);
    const refreshToken = jwt.sign(payload, process.env.CODE, refreshOptions);
    saveInDb(accessToken, refreshToken, user.id)
    return {refreshToken, accessToken};
}

const loginUser = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: ["445263022323-u2nac6qhp2rupfsgc26gkbriup8n7ho5.apps.googleusercontent.com", "445263022323-iej9nrjnjk5gr7h1l9cuq9g9l8mbfr6b.apps.googleusercontent.com", "445263022323-e0okjk06i01er8q0gcg51oensjp8h34o.apps.googleusercontent.com"],
        });
        const payload = ticket.getPayload();
        return {name: payload.given_name, surname: payload.family_name, email: payload.email, photoUrl: payload.picture}
    } catch (e) {
        throw new Unauthorized( "Invalid token")
    }
}

const saveInDb = async (accessToken, refreshToken, userId) => {
    await Authorization.create({
        userId: userId,
        accessToken: accessToken,
        refreshToken: refreshToken
    })
}

module.exports = {
    loginUser, createAuthTokens
};