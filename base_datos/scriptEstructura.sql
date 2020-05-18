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
DROP TABLE IF EXISTS tipoNegocio; $$
DELIMITER ;
DELIMITER $$
CREATE TABLE IF NOT EXISTS tipoNegocio(
    idTipoNegocio INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreTipoNegocio VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
DROP TABLE IF EXISTS negocio; $$
DELIMITER ;
DELIMITER $$
CREATE TABLE IF NOT EXISTS negocio(
    idNegocio INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idTipoNegocio INT(10) unsigned,
    nombreNegocio VARCHAR(250),
    ruc VARCHAR(11),
    logo VARCHAR(250),
    correo VARCHAR(250),
    telefono VARCHAR(20),
    razonSocial VARCHAR(250),
    representante VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
DROP TABLE IF EXISTS cliente; $$
DELIMITER ;
DELIMITER $$
CREATE TABLE IF NOT EXISTS cliente(
    idCliente INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    registroNacional VARCHAR (11),
    nombreCompleto VARCHAR(250),
    apellidoPaterno VARCHAR(250),
    apellidoMaterno VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
DROP TABLE IF EXISTS usuario; $$
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
-- ======================================================================= --
DELIMITER $$
DROP TABLE IF EXISTS tipoProducto; $$
DELIMITER ;
DELIMITER $$
CREATE TABLE IF NOT EXISTS tipoProducto(
    idtipoProducto INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreTipoProducto VARCHAR(250),
    imagenTipoProducto VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
DROP TABLE IF EXISTS tipoUnidad; $$
DELIMITER ;
DELIMITER $$
CREATE TABLE IF NOT EXISTS tipoUnidad(
    idTipoUnidad INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreTipoUnidad VARCHAR(250)
);
$$
DELIMITER ;

DELIMITER $$
DROP TABLE IF EXISTS producto; $$
DELIMITER ;
DELIMITER $$
CREATE TABLE IF NOT EXISTS producto(
    idProducto INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idNegocio INT(10) unsigned,
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
    idNegocio INT(10) unsigned,
    idPedido INT(10) unsigned
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE pedido(
    idPedido INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipoUsuario VARCHAR(250),
    codigoUsuario INT(10) unsigned,
    telefonoReferencia VARCHAR(20),
    correoReferencia VARCHAR(250),
    lat VARCHAR(30), lng VARCHAR(30),
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
    idPedido INT(10) unsigned,
    idProducto INT(10) unsigned,
    cantidadProducto DECIMAL(6,2)
);
$$
DELIMITER ;

-- ======================================================================= --

DELIMITER $$
CREATE TABLE movimiento(
    idMovimiento INT(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idNegocio INT(10) unsigned,
    idLocal INT(10) unsigned,
    idUsuario INT(10) unsigned, -- Quien registra
    idCliente INT(10) unsigned NULL, -- Quien ecargado
    idMotivo INT(10) unsigned,
    tipoMovimiento INT(10) unsigned,
    documentacion VARCHAR(200), -- GUIA DE REMISON FACTURA BOLETA 
    fechaRegistro VARCHAR(10),
    observacion TEXT CHARACTER SET utf8 NULL
);
$$
DELIMITER ;

DELIMITER $$
CREATE TABLE detalle_movimiento(
    idDetalleMovimiento INT(10) unsigned PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    idMovimiento INT(10) unsigned,
    idProducto INT(10) unsigned,
    idPresentacion INT(10) unsigned,
    loteProducto VARCHAR(20),
    fechaVencimiento VARCHAR(10),
    cantidad INT(10)
);
$$
DELIMITER ;

-- ======================================================================= --
TRUNCATE tipoUnidad;
TRUNCATE tipoProducto;
TRUNCATE tipoNegocio;
TRUNCATE negocio;
TRUNCATE producto;

-- ======================================================================= --
INSERT INTO tipoUnidad(nombreTipoUnidad) VALUES
('GR'),('ML'),('UNIDAD'),('BOTELLA'),('CAJA'),('PLATO');

INSERT INTO tipoProducto(nombreTipoProducto,imagenTipoProducto) VALUES
('TIPO','/img/fondos/tipo.jpg'),
('VERDURA','/img/fondos/verduras.jpg'),
('CARNE','/img/fondos/carnes.jpg'),
('LACTEO','/img/fondos/lacteos.jpg'),
('BEBIDA','/img/fondos/bebidas.jpg'),
('LIMPIEZA','/img/fondos/limpieza.jpg'),
('COMIDA','/img/fondos/comidas.jpg');

INSERT INTO tipoNegocio(nombreTipoNegocio) VALUES
('MERCADO'),('SUPERMERCADO'),('POLLERIA');

INSERT INTO negocio(idTipoNegocio,nombreNegocio,ruc,logo,correo,telefono,razonSocial,representante) VALUES
(1,'Mercado Vinocanchon','20729476214','/img/negocio/vinocanchon.jpeg','vinocanchon@gmail.com','+51 989878909','Vinocanchon S.A.C','World Connect'),
(2,'Orion Supermercado','20729476214','/img/negocio/orion.jpg','orion@gmail.com','+51 989878909','Orion Supermercados S.R.L.I','Orion'),
(3,'La Granja','20729476214','/img/negocio/lagranja.png','lagranja@gmail.com','+51 989878909','La Granja S.A.C','La Granja');

INSERT INTO 
producto(idNegocio,idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto) VALUES
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