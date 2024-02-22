const { createUser, findUserByEmail } = require("../services/userService");
const {
  createAuthTokens,
  loginUser,
  refreshToken,
} = require("../services/authService");
const {verify} = require("jsonwebtoken");
const authenticate = async (req, res) => {
  try {
    const googleToken = req.body.token
    const accessToken = req.headers["authorization"]

    let user = null
    let tokens = null
    if(googleToken !== null) {
      const userData = await loginUser(
          googleToken,
          accessToken
      );
      user = await findUserByEmail(userData.email);
      if (!user) {
        user = await createUser(userData);
      }
      tokens = createAuthTokens(user);
    } else if (accessToken !== null) {
      const decode = verify(accessToken, process.env.CODE, (err, decoded) => {
        if (err) {
          res.status(403).send();
        } else {
          return decoded
        }
      });
      const userData = await findUserByEmail(decode.email);
      user = userData.dataValues
      tokens = createAuthTokens(user);
    } else {
      res.status(400).json({msg: 'invalid credentials'})
    }


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
    const accessToken = req.headers["authorization"];
    const refresh = req.body.refreshToken;

    let user = await refreshToken(accessToken, refresh);
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
  authenticate,
  refresh,
};
