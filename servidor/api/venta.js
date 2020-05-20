'use strict';
const gestorPedido = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/***************  A G R E G A R   P E D I  D O  *******************/
gestorPedido.post('/agregar', async (solicitud, respuesta) => {
    try {

        const { idNegocio,idPedido } = solicitud.body;

        await proveedorDeDatos.query(`INSERT INTO venta(idNegocio,idPedido) VALUES (?,?);`,

        [ idNegocio,idPedido ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/**********  L I S T A R   P E D I D O   N E G O C I O  *********/
gestorPedido.post('/lista/negocio', async (solicitud, respuesta) => {
    try {
        const { codigoUsuario } = solicitud.body;
        await proveedorDeDatos.query(`

        SELECT v.idVenta,
        p.fechaRegistro,p.correoReferencia,p.telefonoReferencia,p.totalProductos,p.totalPagar,
        c.nombreCompleto,c.apellidoPaterno,d.denominacionDireccion,d.referenciaDireccion
        FROM venta v 
        INNER JOIN pedido p ON p.idPedido = v.idPedido
        INNER JOIN cliente c ON c.idCliente = p.codigoUsuario
        INNER JOIN direccion d ON d.idDireccion = p.idDireccion
        WHERE v.idNegocio = ?;
        
        `,[ codigoUsuario ],

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

