DELIMITER $$
DROP DATABASE IF EXISTS vm; $$
DELIMITER ;
DELIMITER $$
CREATE DATABASE IF NOT EXISTS vm;
USE vm;
$$
DELIMITER ;
-- ======================================================================= --
DELIMITER $$
CREATE TABLE IF NOT EXISTS tipoNegocio(
    idTipoNegocio INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idTipoPadre INT(10) unsigned,
    nombreTipoNegocio VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS negocio(
    idNegocio INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idTipoNegocio INT(10) unsigned,
    nombreNegocio VARCHAR(250),
    ruc VARCHAR(11),
    logo VARCHAR(250),
    correoNegocio VARCHAR(250),
    telefonoNegocio VARCHAR(20),
    descripcionNegocio VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS tienda(
    idTienda INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idNegocio INT(10) unsigned,
    idTipoNegocio INT(10) unsigned,
    numeroTienda VARCHAR(250),
    nombreTienda VARCHAR(250),
    ruc VARCHAR(11),
    logo VARCHAR(250),
    correoTienda VARCHAR(250),
    telefonoTienda VARCHAR(20),
    direccionTienda VARCHAR(250),
    descripcionTienda VARCHAR(250),
    lat VARCHAR(30), lng VARCHAR(30)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS cliente(
    idCliente INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    registroNacional VARCHAR (11),
    nombreCompleto VARCHAR(250),
    apellidoPaterno VARCHAR(250),
    apellidoMaterno VARCHAR(250),
    correoCliente VARCHAR(250),
    telefonoCliente VARCHAR(20),
    imagenCliente VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS direccion(
    idDireccion INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idCliente INT(10) unsigned,
    denominacionDireccion VARCHAR (250),
    referenciaDireccion VARCHAR(250),
    lat VARCHAR(30), lng VARCHAR(30)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS usuario(
    idUsuario INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreUsuario VARCHAR(250),
    contrasena VARCHAR(250),
    tipoUsuario VARCHAR(250),
    codigoUsuario INT(10)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS tarjeta(
    idTarjeta INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idBanco INT(10) unsigned,
    idUsuario INT(10) unsigned,
    tipoTarjeta VARCHAR(250),
    ccb VARCHAR(40),
    cci VARCHAR(40)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS banco(
    idBanco INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreBanco VARCHAR(250)
);
$$
DELIMITER ;



-- ======================================================================= --
DELIMITER $$
CREATE TABLE IF NOT EXISTS tipoProducto(
    idtipoProducto INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreTipoProducto VARCHAR(250),
    imagenTipoProducto VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS tipoProductoNegocio(
    idProductoNegocio INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idTipoNegocio INT(10) unsigned,
    idTipoProducto INT(10) unsigned
);
$$
DELIMITER ;


DELIMITER $$
CREATE TABLE IF NOT EXISTS tipoUnidad(
    idTipoUnidad INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreTipoUnidad VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE IF NOT EXISTS producto(
    idProducto INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idTienda INT(10) unsigned,
    idTipoProducto INT(10) unsigned,
    tipoUnidad VARCHAR(250),
    nombreProducto VARCHAR(250),
    detalleProducto VARCHAR(250),
    precioPorUnidad DECIMAL(6,2),
    unidadCantidad DECIMAL(6,2),
    descuentoUnidad DECIMAL(6,2),
    imagenProducto VARCHAR(250)
);
$$
DELIMITER ;
-- ======================================================================= --
DELIMITER $$
CREATE TABLE venta(
    idVenta INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idTienda INT(10) unsigned,
    idPedido INT(10) unsigned
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE pedido(
    idPedido INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipoUsuario VARCHAR(250),
    codigoUsuario INT(10) unsigned,
    idDireccion INT(10) unsigned,
    telefonoReferencia VARCHAR(20),
    correoReferencia VARCHAR(250),
    totalProductos INT(10) unsigned,
    totalPagar DECIMAL(6,2),
    fechaRegistro VARCHAR(30),
    estadoPedido VARCHAR(30)
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE pedidoDetalle(
    idPedidoDetalle INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idTienda INT(10) unsigned,
    idPedido INT(10) unsigned,
    idProducto INT(10) unsigned,
    cantidadProducto DECIMAL(6,2),
    precioPorUnidad DECIMAL(6,2)
);
$$
DELIMITER ;

-- ======================================================================= --

INSERT INTO tipoUnidad(nombreTipoUnidad) VALUES
('GR'),('ML'),('UNIDAD'),('BOTELLA'),('CAJA'),('PLATO'),('POTE');

INSERT INTO tipoNegocio(nombreTipoNegocio) VALUES
('mercado'),('restaurante'),('comercio'),('supermercado'),('farmacia'),('servicio');

INSERT INTO tipoProducto(nombreTipoProducto,imagenTipoProducto) VALUES 
('tipo','/img/fondos/tipos/tipo.jpg'),
('verdura','/img/fondos/tipos/verduras.jpg'),
('carne','/img/fondos/tipos/carnes.jpg'),
('limpieza','/img/fondos/tipos/limpieza.jpg'),
('parrilla','/img/fondos/tipos/parrillas.jpg'),
('pasta','/img/fondos/tipos/pastas.jpg'),
('extra','/img/fondos/tipos/extras.jpg'),
('vestimenta','/img/fondos/tipos/vestimentas.jpg'),
('calzado','/img/fondos/tipos/calzados.jpg'),
('tecnologia','/img/fondos/tipos/tecnologias.jpg'),
('lacteo','/img/fondos/tipos/lacteos.jpg'),
('embutido','/img/fondos/tipos/embutidos.jpg'),
('bebida','/img/fondos/tipos/bebidas.jpg'),
('extracto','/img/fondos/tipos/extractos.jpg'),
('medicamento','/img/fondos/tipos/capsulas.jpg'),
('aseo','/img/fondos/tipos/aseo.jpg'),
('privado','/img/fondos/tipos/privado.jpg'),
('mantenimiento','/img/fondos/tipos/mantenimiento.jpg'),
('telecomunicacion','/img/fondos/tipos/telecomunicacion.jpg');

INSERT INTO tipoProductoNegocio(idTipoNegocio,idTipoProducto) VALUES
(1,2), (1,3), (1,4), (2,5), (2,6), (2,7), (3,8), (3,9), (3,10), (4,11), (4,12), (4,13), (5,14), (5,15), (5,16), (6,17), (6,18), (6,19);

INSERT INTO producto(idTienda,idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto) VALUES
(1,2,'GR','Tomate Rojo','Tomates Rojos', 7.50 , 1000 , 10 ,'/img/productos/tomate.jpg'),
(1,2,'GR','Cebola Roja','Cebolla Roja', 5.00 , 1000 , 10 ,'/img/productos/cebolla.jpg'),
(1,2,'GR','Zanahoria','Zahanoria', 6.00 , 1000 , 10 ,'/img/productos/zanahoria.jpg'),
(1,3,'GR','Pollo','Pollo', 12.00 , 1000 , 10 ,'/img/productos/pollo.jpg'),
(1,3,'GR','Res','Res', 16.00 , 1000 , 10 ,'/img/productos/res.jpg'),
(1,3,'GR','Pescado','Pescado', 13.00 , 1000 , 10 ,'/img/productos/pescado.jpg'),
(1,4,'ML','Leche','Leche', 9.90 , 1000 , 10 ,'/img/productos/leche.jpg'),
(1,4,'GR','Queso','Queso', 8.00 , 1000 , 10 ,'/img/productos/queso.jpg'),
(1,4,'GR','Mantequilla','Mantequilla', 2.50 , 250 , 10 ,'/img/productos/huevo.jpg'),
(2,5,'ML','Geseosa','Geseosa', 5.00 , 1800 , 10 ,'/img/productos/gaseosa.jpg'),
(2,5,'ML','Agua','Agua', 2.50 , 1000 , 10 ,'/img/productos/agua.jpg'),
(2,5,'ML','Zumo','Zumo', 7.00 , 2000 , 10 ,'/img/productos/zumo.jpg'),
(2,6,'UNIDAD','Guantes/Barbigo','Guantes/Barbigo', 7.00 , 1 , 10 ,'/img/productos/guantes.jpg'),
(2,6,'BOTELLA','Clorox','Clorox', 5.50 , 1 , 10 ,'/img/productos/clorox.jpg'),
(2,6,'CAJA','Jabon','Jabon', 6.00 , 1 , 10 ,'/img/productos/jabon.jpg'),
(3,7,'PLATO','Pollo a la Braza 1/4','Pollo a la Braza', 15.00 , 1 , 10 ,'/img/productos/polloBraza.jpg'),
(3,7,'PLATO','Parrilla','Parilla', 10.00 , 1 , 10 ,'/img/productos/parrilla.jpg'),
(3,7,'PLATO','Anticucho','Anticucho', 10.00 , 1 , 10 ,'/img/productos/anticucho.jpg');



-- ======================================================================= --

TRUNCATE tipoUnidad;
TRUNCATE tipoProducto;
TRUNCATE tipoNegocio;
TRUNCATE negocio;
TRUNCATE producto;