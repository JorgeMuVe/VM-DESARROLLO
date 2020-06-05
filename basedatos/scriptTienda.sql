USE vm;
-- == AGREGAR TIENDA ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS agregarTienda $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE agregarTienda (
IN `@idNegocio` INT(10) unsigned,
IN `@idTipoNegocio` INT(10) unsigned,
IN `@numeroTienda` VARCHAR(250),
IN `@nombreTienda` VARCHAR(250),
IN `@ruc` VARCHAR(11),
IN `@logo` VARCHAR(250),
IN `@correoTienda` VARCHAR(250),
IN `@telefonoTienda` VARCHAR(250),
IN `@direccionTienda` VARCHAR(250),
IN `@descripcionTienda` VARCHAR(250),
IN `@lat` VARCHAR(30),
IN `@lng` VARCHAR(30)
) BEGIN

INSERT INTO tienda (idNegocio,idTipoNegocio,numeroTienda,nombreTienda,ruc,logo,correoTienda,telefonoTienda,direccionTienda,descripcionTienda,lat,lng) VALUES
(`@idNegocio`,`@idTipoNegocio`,`@numeroTienda`,`@nombreTienda`,`@ruc`,`@logo`,`@correoTienda`,`@telefonoTienda`,`@direccionTienda`,`@descripcionTienda`,`@lat`,`@lng`);

END $$
DELIMITER ;

-- == EDITAR TIENDA ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS editarTienda; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE editarTienda (
IN `@idTienda` INT(10) unsigned,
IN `@idNegocio` INT(10) unsigned,
IN `@idTipoNegocio` INT(10) unsigned,
IN `@numeroTienda` VARCHAR(250),
IN `@nombreTienda` VARCHAR(250),
IN `@ruc` VARCHAR(11),
IN `@logo` VARCHAR(250),
IN `@correoTienda` VARCHAR(250),
IN `@telefonoTienda` VARCHAR(250),
IN `@direccionTienda` VARCHAR(250),
IN `@descripcionTienda` VARCHAR(250),
IN `@lat` VARCHAR(30),
IN `@lng` VARCHAR(30)
) BEGIN

UPDATE tienda SET
idNegocio = `@idNegocio`,
idTipoNegocio = `@idTipoNegocio`,
numeroTienda = `@numeroTienda`,
nombreTienda = `@nombreTienda`,
ruc = `@ruc`, logo = `@logo`,
correoTienda = `@correoTienda`,
telefonoTienda = `@telefonoTienda`,
direccionTienda = `@direccionTienda`,
descripcionTienda = `@descripcionTienda`,
lat = `@lat`, lng = `@lng`
WHERE idTienda = `@idTienda`;

END $$
DELIMITER ;

-- == ELIMINAR TIENDA ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS eliminarTienda; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE eliminarTienda (
IN `@idTienda` INT(10) unsigned
) BEGIN

SELECT  `@idTienda`;

END $$
DELIMITER ;

-- == LISTAR TIENDAS DE NEGOCIO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS listarTiendasNegocio; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE listarTiendasNegocio (
IN `@codigoUsuario` INT(10) unsigned,
IN `@inicio` INT(10) unsigned,
IN `@cantidad` INT(10) unsigned
) BEGIN

SELECT t.*
FROM tienda t WHERE t.idNegocio = `@codigoUsuario` LIMIT `@inicio`,`@cantidad`;

END; $$
DELIMITER ;

-- == LISTAR NEGOCIOS POR TIPO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS listarNegociosTipo; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE listarNegociosTipo (
IN `@tipoNegocio` VARCHAR(250),
IN `@inicio` INT(10) unsigned,
IN `@cantidad` INT(10) unsigned
) BEGIN

SELECT n.* FROM negocio n 
INNER JOIN tipoNegocio tn ON n.idTipoNegocio = tn.idTipoNegocio AND tn.nombreTipoNegocio = `@tipoNegocio`
LIMIT `@inicio`,`@cantidad`;

END; $$
DELIMITER ;