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

-- == LISTAR PEDIDO NEGOCIO==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS listarPedidoNegocio; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE listarPedidoNegocio (
    IN `@idNegocio` INT(10) unsigned
) BEGIN

SET @totalProductos=0;
SET @totalPagar=0;
SELECT COUNT(idPedido),SUM(precioPorUnidad) INTO @totalProductos, @totalPagar
FROM pedidoDetalle WHERE idNegocio = `@idNegocio`;

-- SELECT @totalProductos,@totalPagar;
IF @totalProductos > 0
 THEN 
	SELECT p.idPedido,p.fechaRegistro,p.correoReferencia,p.telefonoReferencia,p.estadoPedido,
	@totalProductos as totalProductos,@totalPagar as totalPagar,
	c.nombreCompleto,c.apellidoPaterno,d.denominacionDireccion,d.referenciaDireccion
	FROM venta v
	INNER JOIN pedido p ON v.idPedido = p.idPedido
	INNER JOIN cliente c ON c.idCliente = p.codigoUsuario
	INNER JOIN direccion d ON d.idDireccion = p.idDireccion
	WHERE v.idNegocio =  `@idNegocio`;
END IF;

END $$
DELIMITER ;