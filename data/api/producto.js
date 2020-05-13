'use strict';
const gestorProducto = require('express').Router();

gestorProducto.get('/test', async (solicitud, respuesta) => {
    respuesta.send("Productosd");
});

module.exports = gestorProducto;