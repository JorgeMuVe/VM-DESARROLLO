'use strict';
const gestorPedido = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/***************  A G R E G A R   P E D I  D O  *******************/
gestorPedido.post('/agregar', async (solicitud, respuesta) => {
    try {

        const { tipoUsuario,codigoUsuario,telefonoReferencia,correoReferencia,lat,lng,
            totalProductos,totalPagar,fechaRegistro,estadoPedido } = solicitud.body;

        await proveedorDeDatos.query(`
        INSERT INTO pedido (tipoUsuario,codigoUsuario,telefonoReferencia,correoReferencia,lat,lng,
            totalProductos,totalPagar,fechaRegistro,estadoPedido) VALUES(?,?,?,?,?,?,?,?,?,?);`,

        [ tipoUsuario,codigoUsuario,telefonoReferencia,correoReferencia,lat,lng,
            totalProductos,totalPagar,fechaRegistro,estadoPedido] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/**********  L I S T A R   P E D I D O   C L I E N T E  *********/
gestorPedido.post('/lista/cliente', async (solicitud, respuesta) => {
    try {
        const { codigoUsuario } = solicitud.body;
        await proveedorDeDatos.query(`SELECT * FROM pedido WHERE codigoUsuario = ? AND tipoUsuario='cliente'`,
        [ codigoUsuario ],

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

module.exports = gestorPedido;

