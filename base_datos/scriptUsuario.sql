USE vm;
-- == AGREGAR USUARIO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS agregarUsuario; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE agregarUsuario (
IN `@registroNacional` VARCHAR(11),
IN `@nombreCompleto` VARCHAR(250),
IN `@apellidoPaterno` VARCHAR(40),
IN `@apellidoMaterno` VARCHAR(40),
IN `@nombreUsuario` VARCHAR(250),
IN `@contrasena` VARCHAR(250),
IN `@tipoUsuario` VARCHAR(250)
) BEGIN

IF NOT EXISTS (SELECT * FROM usuario WHERE nombreUsuario = `@nombreUsuario`) THEN 
    INSERT INTO cliente(registroNacional, nombreCompleto, apellidoPaterno, apellidoMaterno) 
    VALUES (`@registroNacional`, `@nombreCompleto`, `@apellidoPaterno`, `@apellidoMaterno`);
    SET @ultimoCliente = LAST_INSERT_ID();

    INSERT INTO usuario(nombreUsuario, contrasena, tipoUsuario, codigoUsuario) 
    VALUES (`@nombreUsuario`, SHA1(`@contrasena`), `@tipoUsuario`, @ultimoCliente);
    
    SELECT c.nombreCompleto,c.apellidoPaterno,c.apellidoMaterno,u.tipoUsuario, @ultimoCliente as codigoUsuario
    FROM cliente c INNER JOIN usuario u ON u.codigoUsuario = c.idCliente
    WHERE c.idCliente = @ultimoCliente;

ELSE SELECT "Existe Usuario registrado" AS error;
END IF;
END $$
DELIMITER ;

-- == BUSCAR USUARIO CLIENTE ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS buscarUsuarioCliente; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE buscarUsuarioCliente (
IN `@codigoUsuario` INT(10)
) BEGIN

SELECT nombreCompleto,apellidoPaterno,apellidoMaterno,
'cliente' AS tipoUsuario,`@codigoUsuario` AS codigoUsuario 
FROM cliente WHERE idCliente = `@codigoUsuario`;

END; $$
DELIMITER ;

-- == BUSCAR USUARIO NEGOCIO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS buscarUsuarioNegocio; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE buscarUsuarioNegocio (
IN `@codigoUsuario` INT(10)
) BEGIN

SELECT nombreNegocio,logo,correo,telefono,
'negocio' AS tipoUsuario,`@codigoUsuario` AS codigoUsuario 
FROM negocio WHERE idNegocio = `@codigoUsuario`;

END; $$
DELIMITER ;

-- == INGRESAR AL SISTEMA ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS ingresarSistema; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE ingresarSistema (
IN `@nombreUsuario` VARCHAR(250),
IN `@contrasena` VARCHAR(250),
IN `@tipoUsuario` VARCHAR(250)
) BEGIN

SET @codigoUsuario = NULL;

IF EXISTS ( SELECT codigoUsuario FROM usuario WHERE nombreUsuario=`@nombreUsuario` AND contrasena=SHA1(`@contrasena`)) THEN 
    SELECT codigoUsuario INTO @codigoUsuario FROM usuario
    WHERE nombreUsuario = `@nombreUsuario`;

    SELECT c.nombreCompleto,c.apellidoPaterno,c.apellidoMaterno,u.tipoUsuario, @codigoUsuario as codigoUsuario
    FROM cliente c INNER JOIN usuario u ON u.codigoUsuario = c.idCliente
    WHERE c.idCliente = @codigoUsuario;
ELSE SELECT "No existe Usuario" AS error;
END IF;
END $$
DELIMITER ;

-- CALL agregarUsuario('72947621','Jorge K.','Muñiz','Velasquez','jorge.muvez@gmail.com','coco','cliente');
-- CALL agregarUsuario('12345678','Software','World','Connect','software@worldconnect.com','software','cliente');
-- CALL agregarUsuario('12345678','Marketing','Tunki','Studios','marketing@tunki.com','marketing','cliente');
-- INSERT INTO usuario(nombreUsuario,contrasena,tipoUsuario,codigoUsuario) VALUES
-- ('vinocanchon@gmail.com',SHA1('vino'),'negocio',1),
-- ('orion@gmail.com',SHA1('orion'),'negocio',2),
-- ('lagranja@gmail.com',SHA1('lagranja'),'negocio',3);