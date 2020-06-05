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

-- == LISTAR PEDIDO Cliente==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS paginadoPedidoCliente; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE paginadoPedidoCliente (
    IN `@codigoUsuario` INT(10) unsigned,
    IN `@inicio` INT(10) unsigned,
    IN `@cantidad` INT(10) unsigned
) BEGIN

SELECT * FROM pedido WHERE codigoUsuario = `@codigoUsuario`AND tipoUsuario="cliente" LIMIT `@inicio`, `@cantidad`;

END $$
DELIMITER ;

-- == LISTAR PEDIDO Tienda==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS listarPedidoTienda; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE listarPedidoTienda (
    IN `@idTienda` INT(10) unsigned,
    IN `@inicio` INT(10) unsigned,
    IN `@cantidad` INT(10) unsigned

) BEGIN

SET @totalProductos=0;
SET @totalPagar=0;
SELECT COUNT(idPedido),SUM(precioPorUnidad) INTO @totalProductos, @totalPagar
FROM pedidoDetalle WHERE idTienda = `@idTienda`;

-- SELECT @totalProductos,@totalPagar;
IF @totalProductos > 0
 THEN 
	SELECT p.idPedido,p.fechaRegistro,p.correoReferencia,p.telefonoReferencia,p.estadoPedido,
	@totalProductos as totalProductos,@totalPagar as totalPagar,
	c.nombreCompleto,c.apellidoPaterno,d.denominacionDireccion,d.referenciaDireccion,d.lat,d.lng
	FROM venta v
	INNER JOIN pedido p ON v.idPedido = p.idPedido
	INNER JOIN cliente c ON c.idCliente = p.codigoUsuario
	INNER JOIN direccion d ON d.idDireccion = p.idDireccion
	WHERE v.idTienda =  `@idTienda` LIMIT `@inicio`,`@cantidad`;
END IF;

END $$
DELIMITER ;