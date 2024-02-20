const { createUser, findUserByEmail } = require("../services/userService");
const { createAuthTokens, loginUser, refreshToken} = require("../services/authService");
const authenticate = async (req, res) => {
  try {
    const userData = await loginUser(req.body.token, req.headers['authorization']);
    let user = await findUserByEmail(userData.email);

    if (!user) {
      user = await createUser(userData);
    }
    const tokens = createAuthTokens(user);

    res.status(201).json({
      id: user.id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    console.error(`${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};

const refresh = async (req, res) => {
  try {
    const accessToken = req.headers['authorization']
    const refresh = req.body.refreshToken

    let user = await refreshToken(accessToken, refresh)
    const tokens = createAuthTokens(user);

    res.status(201).json({
      id: user.id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    console.error(` ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};
module.exports = {
  authenticate, refresh
};
