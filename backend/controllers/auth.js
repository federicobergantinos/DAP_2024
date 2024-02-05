const {response} = require("express");
const signUp = async (req, res = response) => {
    try {
        const { googleToken } = req.params;
        //hacer signUp

        res.status(201).json(
            {
                "accessToken": googleToken,
                "refreshToken": "refresh"
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
    signUp,
};