'use strict';
const gestorPedido = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/***************  A G R E G A R   P E D I  D O  *******************/
gestorPedido.post('/agregar', async (solicitud, respuesta) => {
    try {

        const { tipoUsuario,codigoUsuario,idDireccion,telefonoReferencia,correoReferencia,
            totalProductos,totalPagar,fechaRegistro,estadoPedido } = solicitud.body;

        await proveedorDeDatos.query(`CALL agregarPedido(?,?,?,?,?,?,?,?,?);`,

        [ tipoUsuario,codigoUsuario,idDireccion,telefonoReferencia,correoReferencia,
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

/********  A G R E G A R   P E D I  D O   D E T A L L E  *************/
gestorPedido.post('/agregar/detalle', async (solicitud, respuesta) => {
    try {

        const { idPedido,idNegocio,idProducto,cantidadProducto,precioPorUnidad } = solicitud.body;

        await proveedorDeDatos.query(`
            INSERT INTO pedidoDetalle(idPedido,idNegocio,idProducto,cantidadProducto,precioPorUnidad)
            VALUES (? , ? , ? , ? , ?);`,

        [ idPedido,idNegocio,idProducto,cantidadProducto,precioPorUnidad ] ,

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

/**********  L I S T A R   P E D I D O   N E G O C I O  *********/
gestorPedido.post('/lista/negocio', async (solicitud, respuesta) => {
    try {
        const { codigoUsuario } = solicitud.body;
        await proveedorDeDatos.query(`

            CALL listarPedidoNegocio(?);

        `,[ codigoUsuario ],

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado[0]); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

module.exports = gestorPedido;

