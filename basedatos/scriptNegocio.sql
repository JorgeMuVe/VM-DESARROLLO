DELIMITER $$
CREATE PROCEDURE editarNegocio(
	IN `@idNegocio` INT(10) UNSIGNED,
    IN `@idTipoNegocio` INT(10) UNSIGNED,
    IN `@nombreNegocio` VARCHAR(250),
    IN `@ruc` VARCHAR(11),
    IN `@logo` VARCHAR(250),
    IN `@correoNegocio` VARCHAR(250),
    IN `@telefonoNegocio` VARCHAR(250),
    IN `@descripcionNegocio` VARCHAR(250))
BEGIN

UPDATE negocio SET
idTipoNegocio = `@idTipoNegocio`,
nombreNegocio = `@nombreNegocio`,
ruc = `@ruc`, logo = `@logo`,
correoNegocio = `@correoNegocio`,
telefonoNegocio = `@telefonoNegocio`,
descripcionNegocio = `@descripcionNegocio`
WHERE idNegocio = `@idNegocio`;

END$$
DELIMITER ;

CREATE TABLE ciudad(
    idCiudad INT(10) unsigned PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nombreCiudad VARCHAR(250)
);
$$
DELIMITER ;