USE vm;
-- == AGREGAR PEDIDO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS agregarPedido; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE agregarPedido (
    IN `@tipoUsuario` VARCHAR(250),
    IN `@codigoUsuario` INT(10) unsigned,
    IN `@idDireccion` INT(10) unsigned,
    IN `@telefonoReferencia` VARCHAR(20),
    IN `@correoReferencia` VARCHAR(250),
    IN `@totalProductos` INT(10) unsigned,
    IN `@totalPagar` DECIMAL(6,2),
    IN `@fechaRegistro` VARCHAR(30),
    IN `@estadoPedido` VARCHAR(30)
) BEGIN

INSERT INTO pedido (tipoUsuario,codigoUsuario,idDireccion,telefonoReferencia,correoReferencia,
totalProductos,totalPagar,fechaRegistro,estadoPedido) 
VALUES(`@tipoUsuario`,`@codigoUsuario`,`@idDireccion`,`@telefonoReferencia`,`@correoReferencia`,
`@totalProductos`,`@totalPagar`,`@fechaRegistro`,`@estadoPedido`);

SELECT LAST_INSERT_ID() AS idPedido;

END $$
DELIMITER ;