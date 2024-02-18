const {createUser, findUserByEmail} = require("../services/userService");
const {createAuthTokens, loginUser} = require("../services/authService");
const authenticate = async (req, res ) => {
    try {
        console.log(req.body)
        const userData = await loginUser(req.body.token)
        let user = await findUserByEmail(userData.email)

        if (!user) {
            user = await createUser(userData)
        }

        const tokens = createAuthTokens(user)

        res.status(201).json(
            {
                id: user.id,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        );
    } catch (error) {
        console.error(`getResources: ${error}`);
        res.status(error.code || 500).json({
            msg: error.message || "An exception has ocurred",
        });
    }
};

module.exports = {
    authenticate,
};
