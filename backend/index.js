const express = require('express');
const router = require('express').Router();


const app = express();
app.get('/ping', (req, res) => { res.send('pong'); });

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
