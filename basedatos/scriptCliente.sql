USE vm;
-- == EDITAR CLIENTE ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS editarCliente; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE editarCliente (
IN `@idCliente` INT(10) unsigned,
IN `@registroNacional` VARCHAR (11),
IN `@nombreCompleto` VARCHAR(250),
IN `@apellidoPaterno` VARCHAR(250),
IN `@apellidoMaterno` VARCHAR(250),
IN `@telefonoCliente` VARCHAR(20),
IN `@imagenCliente` VARCHAR(250)
) BEGIN

UPDATE cliente SET
registroNacional = `@registroNacional`,
nombreCompleto = `@nombreCompleto`,
apellidoPaterno = `@apellidoPaterno`,
apellidoMaterno = `@apellidoMaterno`,
telefonoCliente = `@telefonoCliente`,
imagenCliente = `@imagenCliente`
WHERE idCliente = `@idCliente`;

END $$
DELIMITER ;