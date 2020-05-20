USE vm;
-- == AGREGAR DIRECCION ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS agregarDireccion; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE agregarDireccion (
    IN `@idCliente` INT(10) unsigned,
    IN `@denominacionDireccion` VARCHAR(250),
    IN `@referenciaDireccion` VARCHAR(250),
    IN `@lat` VARCHAR(30),
    IN `@lng` VARCHAR(30)
) BEGIN

INSERT INTO direccion (idCliente,denominacionDireccion,referenciaDireccion,lat,lng) 
VALUES(`@idCliente`,`@denominacionDireccion`,`@referenciaDireccion`,`@lat`,`@lng`);

SELECT LAST_INSERT_ID() AS idDireccion;

END $$
DELIMITER ;

CALL agregarDireccion('1','San Sebastian Calle Bolivar 709','Por el Cementerio de San Sebastian','-75,1234','13,7876');
CALL agregarDireccion('1','Urb. Larapa 789','Espalda de Universidad Andina','-75,1234','13,7876');