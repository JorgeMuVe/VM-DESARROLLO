USE vm;
-- == AGREGAR USUARIO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS agregarUsuario; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE agregarUsuario (
IN `@registroNacional` VARCHAR(11),
IN `@nombreCompleto` VARCHAR(250),
IN `@apellidoPaterno` VARCHAR(250),
IN `@apellidoMaterno` VARCHAR(250),
IN `@telefonoCliente` VARCHAR(20),
IN `@imagenCliente` VARCHAR(250),
IN `@nombreUsuario` VARCHAR(250),
IN `@contrasena` VARCHAR(250),
IN `@tipoUsuario` VARCHAR(250)
) BEGIN

IF NOT EXISTS (SELECT * FROM usuario WHERE nombreUsuario = `@nombreUsuario`) THEN 
    INSERT INTO cliente(registroNacional, nombreCompleto, apellidoPaterno, apellidoMaterno,correoCliente,telefonoCliente,imagenCliente) 
    VALUES (`@registroNacional`, `@nombreCompleto`, `@apellidoPaterno`, `@apellidoMaterno`,`@nombreUsuario`,`@telefonoCliente`,`@imagenCliente`);
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

SELECT c.nombreCompleto,c.apellidoPaterno,c.apellidoMaterno,
c.registroNacional,c.imagenCliente,c.telefonoCliente,c.correoCliente,
'cliente' AS tipoUsuario,`@codigoUsuario` AS codigoUsuario 
FROM cliente c WHERE c.idCliente = `@codigoUsuario`;

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

SELECT nombreNegocio,ruc,logo,correoNegocio,telefonoNegocio,descripcionNegocio,
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

IF EXISTS ( SELECT codigoUsuario FROM usuario WHERE nombreUsuario=`@nombreUsuario` AND contrasena=SHA1(`@contrasena`) AND tipoUsuario=`@tipoUsuario`) THEN
	SELECT codigoUsuario INTO @codigoUsuario FROM usuario
	WHERE nombreUsuario = `@nombreUsuario`;
	IF(`@tipoUsuario` = 'cliente') THEN
        SELECT c.nombreCompleto,c.apellidoPaterno,c.apellidoMaterno,u.tipoUsuario, @codigoUsuario as codigoUsuario
        FROM cliente c INNER JOIN usuario u ON u.codigoUsuario = c.idCliente AND u.tipoUsuario = 'cliente'
        WHERE c.idCliente = @codigoUsuario;
    END IF;
	IF(`@tipoUsuario` = 'negocio') THEN
		SELECT n.nombreNegocio,n.logo,n.correoNegocio,n.telefonoNegocio,u.tipoUsuario,u.codigoUsuario
        FROM negocio n INNER JOIN usuario u ON u.codigoUsuario = n.idNegocio AND u.tipoUsuario = 'negocio'
        WHERE n.idNegocio = @codigoUsuario;
    END IF;
ELSE SELECT "No existe Usuario" AS error;
END IF;
END $$
DELIMITER ;


-- CALL agregarUsuario('72947621','Jorge K.','Muñiz','Velasquez','987654321','/img/clientes/jorgemv.jpg','jorge.muvez@gmail.com','coco','cliente');
-- CALL agregarUsuario('12345678','Software','World','Connect','987654321','/img/clientes/jorgemv.jpg','software@worldconnect.com','software','cliente');
-- CALL agregarUsuario('12345678','Marketing','Tunki','Studios','987654321','/img/clientes/jorgemv.jpg','marketing@tunki.com','marketing','cliente');
-- INSERT INTO usuario(nombreUsuario,contrasena,tipoUsuario,codigoUsuario) VALUES
-- ('vinocanchon@gmail.com',SHA1('vino'),'negocio',1),
-- ('orion@gmail.com',SHA1('orion'),'negocio',2),
-- ('lagranja@gmail.com',SHA1('lagranja'),'negocio',3),
-- ('hampinawassi@gmail.com',SHA1('hampina'),'negocio',4);