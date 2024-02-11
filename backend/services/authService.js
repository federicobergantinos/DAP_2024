const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: ["445263022323-e0okjk06i01er8q0gcg51oensjp8h34o.apps.googleusercontent.com", "445263022323-iej9nrjnjk5gr7h1l9cuq9g9l8mbfr6b.apps.googleusercontent.com"],
    });
    const payload = ticket.getPayload();
    console.log(payload)
    const userid = payload['sub'];
}

module.exports = {
    verify,
};