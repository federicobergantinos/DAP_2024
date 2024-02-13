const create = async (req, res ) => {
    try {

        const newUser = await createUser(req.body)

        res.status(201).json(
            {
                id: newUser.id,
                accessToken: newUser.accessToken,
                refreshToken: newUser.refreshToken
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
    create,
};
