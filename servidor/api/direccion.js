'use strict';
const gestorDireccion = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/**********  L I S T A R   D I R E C C I O N   C L I E N T E   *********/
gestorDireccion.get('/lista/:idCliente', async (solicitud, respuesta) => {
    try {
        const { idCliente } = solicitud.params;
        await proveedorDeDatos.query(`

        SELECT d.* FROM direccion d WHERE d.idCliente = ?;
        
        `,[ idCliente ],

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});


/***************  A G R E G A R   D I R E C C I O N  *******************/
gestorDireccion.post('/agregar', async (solicitud, respuesta) => {
    try {

        const { idCliente,denominacionDireccion,referenciaDireccion,lat,lng } = solicitud.body;

        await proveedorDeDatos.query(`CALL agregarDireccion(?,?,?,?,?)`,

        [ idCliente,denominacionDireccion,referenciaDireccion,lat,lng ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

module.exports = gestorDireccion;

