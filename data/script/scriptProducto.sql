USE vm;
--== LISTAR PRODUCTO POR TIPO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS listarProductoPorTipo; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE listarProductoPorTipo (
IN `@tipoProducto` INT(10)
) BEGIN

SELECT 
tn.nombreTipoNegocio,n.nombreNegocio,tp.nombreTipoProducto,p.nombreProducto,p.detalleProducto,
p.precioPorUnidad,p.unidadCantidad,p.tipoUnidad,p.descuentoUnidad,tp.imagenTipoProducto,
p.idProducto,tp.idTipoProducto,n.idNegocio,tn.idTipoNegocio
FROM producto p 
INNER JOIN tipoProducto tp 
ON p.idTipoProducto = tp.idTipoProducto 
AND tp.idTipoProducto = `@tipoProducto`
INNER JOIN negocio n ON n.idNegocio = p.idNegocio
INNER JOIN tipoNegocio tn ON tn.idTipoNegocio = n.idTipoNegocio;

END; $$
$$  
DELIMITER ;