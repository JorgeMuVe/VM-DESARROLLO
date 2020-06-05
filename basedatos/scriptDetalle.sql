USE vm;

-- == LISTAR DETALLES DE PEDIDO TIENDA==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS listarDetallePedidoTienda $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE listarDetallePedidoTienda (
    IN `@idTienda` INT(10) unsigned,
    IN `@idPedido` INT(10) unsigned,
    IN `@inicio` INT(10) unsigned,
    IN `@cantidad` INT(10) unsigned

) BEGIN

    SELECT pd.*, p.* 
    FROM pedidoDetalle pd 
    INNER JOIN producto p ON p.idProducto = pd.idProducto
    WHERE pd.idTienda = `@idTienda` AND pd.idPedido = `@idPedido`
    LIMIT `@inicio`, `@cantidad`;

END $$
DELIMITER ;

-- == LISTAR DETALLES DE PEDIDO CLIENTE==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS listarDetallePedidoCliente $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE listarDetallePedidoCliente (
    IN `@idPedido` INT(10) unsigned,
    IN `@inicio` INT(10) unsigned,
    IN `@cantidad` INT(10) unsigned

) BEGIN

    SELECT pd.*, p.* 
    FROM pedidoDetalle pd 
    INNER JOIN producto p ON p.idProducto = pd.idProducto
    WHERE pd.idPedido = `@idPedido`
    LIMIT `@inicio`, `@cantidad`;

END $$
DELIMITER ;