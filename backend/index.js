const express = require('express');

const app = express();

paths = {
    status: "/ping",
};

app.use(paths.status, require("./routes/healthCheck"));


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
