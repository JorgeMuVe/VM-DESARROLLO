'use strict';
const gestorProducto = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/***************  A G R E G A R   P R O D U C T O  *******************/
gestorProducto.post('/agregar', async (solicitud, respuesta) => {
    try {

        const {idNegocio,idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,
            precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto} = solicitud.body;

        await proveedorDeDatos.query(`
        INSERT INTO producto (idNegocio, idTipoProducto, tipoUnidad, nombreProducto, 
        detalleProducto, precioPorUnidad, unidadCantidad, descuentoUnidad, imagenProducto)
        VALUES(?,?,?,?,?,?,?,?,?);`, // Consulta a procedimiento almacenado

        [ idNegocio,idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,
            precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/***************  A G R E G A R   P R O D U C T O  *******************/
gestorProducto.post('/editar', async (solicitud, respuesta) => {
    try {

        const {idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,
            precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto,idProducto} = solicitud.body;

        await proveedorDeDatos.query(`
        UPDATE producto SET idTipoProducto = ?,tipoUnidad = ?,nombreProducto = ?,detalleProducto = ?,
        precioPorUnidad = ?,unidadCantidad = ?,descuentoUnidad = ?,imagenProducto = ? WHERE idProducto = ?`, // Consulta a procedimiento almacenado

        [ idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,
            precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto,idProducto ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/***************  B U S C A R   P R O D U C T O  *******************/
gestorProducto.post('/buscar', async (solicitud, respuesta) => {
    try {

        const {tipo,texto} = solicitud.body;

        await proveedorDeDatos.query(`
        SELECT tp.nombreTipoProducto,p.nombreProducto,p.detalleProducto,p.precioPorUnidad,p.unidadCantidad,
        p.tipoUnidad,p.descuentoUnidad,n.nombreNegocio,p.idProducto,n.idNegocio
        FROM producto p INNER JOIN tipoProducto tp ON p.idTipoProducto = tp.idTipoProducto AND tp.nombreTipoProducto LIKE ?
        INNER JOIN negocio n ON p.idNegocio = n.idNegocio
        WHERE p.nombreProducto LIKE ? OR tp.nombreTipoProducto LIKE ?;`, // Consulta a procedimiento almacenado
        
        [ "%"+(tipo==="TODO"?"%":tipo)+"%",  "%"+(texto||"%")+"%"  , "%"+(texto||"%")+"%"  ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});


/************  L I S T A R  P R O D U C T O  N E G O C I O  ***************/
gestorProducto.post('/lista/negocio', async (solicitud, respuesta) => {
    try {
        const {idNegocio} = solicitud.body;

        await proveedorDeDatos.query(`
        SELECT tp.nombreTipoProducto,p.nombreProducto,p.detalleProducto,p.precioPorUnidad,p.unidadCantidad,
        p.tipoUnidad,p.descuentoUnidad,tp.imagenTipoProducto,p.idProducto,tp.idTipoProducto 
        FROM producto p INNER JOIN tipoProducto tp ON p.idTipoProducto = tp.idTipoProducto
        WHERE p.idNegocio = ?;`, // Consulta a procedimiento almacenado

        [ idNegocio ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/************  T I P O   P R O D U C T O  ***************/
gestorProducto.get('/lista/tipo', async (solicitud, respuesta) => {
    try {
        await proveedorDeDatos.query(`SELECT * FROM tipoProducto;`, // Consulta a procedimiento almacenado
        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/************  U N I D A D   P R O D U C T O  ***************/
gestorProducto.get('/lista/unidad', async (solicitud, respuesta) => {
    try {
        await proveedorDeDatos.query(`SELECT * FROM tipoUnidad;`, // Consulta a procedimiento almacenado
        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

module.exports = gestorProducto;


