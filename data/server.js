const express = require('express'), aplicacion = express(); // INICIAR SERVIDOR EXPRESS
const cors = require('cors');
const path = require('path');
const PUERTO = process.env.PORT || 5000;

/* CORS para establecer la SEGURIDAD en la conexión y envio de los datos */
aplicacion.use(cors());
aplicacion.use(function(solicitud,respuesta,siguiente) {
    respuesta.header('Access-Control-Allow-Origin', '*');
    respuesta.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    respuesta.header('Access-Control-Allow-Headers', 'Content-Type');
    siguiente();
});

/* Estable que la comunicación de datos se generaliza al formato JSON */
aplicacion.use(express.urlencoded({ extended : false, limit : '10mb' }));
aplicacion.use(express.json({ limit : '10mb' }));

/* Sección de las rutas para publicar las API(s) */
aplicacion.use('/api/producto', require('./api/producto.js'));

/* APLICACION MEDI-SEDA */
aplicacion.use(express.static(path.join(__dirname,'aplicacion')));
aplicacion.get('/*', function(req,res){
    res.sendFile(path.join(__dirname,'aplicacion','index.html'));
});

// Encender el servidor Express/NODEJS - en el PUERTO previamente definido (5000)
aplicacion.listen(PUERTO, () => { console.log('Servidor escuchando en el Puerto : ' + PUERTO); });
