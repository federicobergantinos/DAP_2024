const express = require('express');

const app = express();

paths = {
    status: "/ping",
    loginV1: "/v1/auth"
};

app.use(paths.status, require("./routes/healthCheck"));
app.use(paths.loginV1, require("./routes/auth"));


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
