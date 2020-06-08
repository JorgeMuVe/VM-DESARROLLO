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
    FROM cliente c INNER JOIN usuario u ON u.codigoUsuario = c.idCliente AND u.tipoUsuario = `@tipoUsuario`
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

-- == BUSCAR USUARIO NEGOCIO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS buscarUsuarioTienda; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE buscarUsuarioTienda (
IN `@codigoUsuario` INT(10)
) BEGIN

SELECT t.nombreTienda,t.ruc,t.logo,t.correoTienda,t.telefonoTienda,t.descripcionTienda,t.direccionTienda,t.lat,t.lng,
t.idNegocio,t.numeroTienda,tn.nombreTipoNegocio,'tienda' AS tipoUsuario,`@codigoUsuario` AS codigoUsuario 
FROM tienda t INNER JOIN tipoNegocio tn ON t.idTipoNegocio = tn.idTipoNegocio 
WHERE t.idTienda = `@codigoUsuario`;

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
	
    IF(`@tipoUsuario` = 'admin') THEN
        SELECT n.nombreNegocio,n.descripcionNegocio,n.logo,n.correoNegocio,n.telefonoNegocio,u.tipoUsuario,u.codigoUsuario
        FROM negocio n INNER JOIN usuario u ON u.codigoUsuario = n.idNegocio AND u.tipoUsuario = 'admin'
        WHERE n.idNegocio = @codigoUsuario;
    END IF;
	IF(`@tipoUsuario` = 'cliente') THEN
        SELECT c.nombreCompleto,c.apellidoPaterno,c.apellidoMaterno,u.tipoUsuario,u.codigoUsuario
        FROM cliente c INNER JOIN usuario u ON u.codigoUsuario = c.idCliente AND u.tipoUsuario = 'cliente'
        WHERE c.idCliente = @codigoUsuario;
    END IF;
	IF(`@tipoUsuario` = 'negocio') THEN
        SELECT n.nombreNegocio,n.logo,n.correoNegocio,n.telefonoNegocio,u.tipoUsuario,u.codigoUsuario
        FROM negocio n INNER JOIN usuario u ON u.codigoUsuario = n.idNegocio AND u.tipoUsuario = 'negocio'
        WHERE n.idNegocio = @codigoUsuario;
    END IF;
    IF(`@tipoUsuario` = 'tienda') THEN
		SELECT t.nombreTienda,t.logo,t.correoTienda,t.telefonoTienda,u.tipoUsuario,u.codigoUsuario
        FROM tienda t INNER JOIN usuario u ON u.codigoUsuario = t.idTienda AND u.tipoUsuario = 'tienda'
        WHERE t.idTienda = @codigoUsuario;
    END IF;


ELSE SELECT "No existe Usuario" AS error;
END IF;
END $$
DELIMITER ;


-- CALL agregarUsuario('72947621','Jorge K.','Muñiz','Velasquez','987654321','/img/clientes/jorgemv.jpg','jorge.muvez@gmail.com','coco','cliente');
-- CALL agregarUsuario('12345678','Software','World','Connect','987654321','/img/clientes/jorgemv.jpg','software@worldconnect.com','software','cliente');
-- CALL agregarUsuario('12345678','Marketing','Tunki','Studios','987654321','/img/clientes/jorgemv.jpg','marketing@tunki.com','marketing','cliente');

INSERT INTO negocio(idTipoNegocio,nombreNegocio,ruc,logo,correoNegocio,telefonoNegocio,descripcionNegocio) VALUES
(20,'Reactiva Perú','12345678901','/img/negocio/logo_vinocanchon.png','reactiva-peru@gmail.com','+51 956 781223','Desarrollo de Soluciones'),
(1,'Mercado Vinocanchon','12345678901','/img/negocio/logo_vinocanchon.png','vinocanchon@gmail.com','+51 956 781223','Mercado de Mayoristas y Minoristas'),
(1,'Mercado Wanchaq','12345678901','/img/negocio/logo_vinocanchon.png','mercadowanchaq@gmail.com','+51 956 781223','Mercado de Minoristas'),
(6,'La Granja','12345678901','/img/negocio/logo_vinocanchon.png','lagranja@gmail.com','+51 956 781223','La Granja Polleria'),
(6,'Pollerias Etapoy','12345678901','/img/negocio/logo_vinocanchon.png','etapoy@gmail.com','+51 956 781223','Pollerias Etapoy'),
(9,'La Canasta','12345678901','/img/negocio/logo_vinocanchon.png','lacanasta@gmail.com','+51 956 781223','Supermercados La Canasta'),
(9,'Supermercados Orion','12345678901','/img/negocio/logo_vinocanchon.png','orion@gmail.com','+51 956 781223','Supermercados Orion'),
(10,'Inka Farma','12345678901','/img/negocio/logo_vinocanchon.png','inkafarma@gmail.com','+51 956 781223','Farmacia Peruana'),
(10,'Hampina Wassi','12345678901','/img/negocio/logo_vinocanchon.png','hampinawassi@gmail.com','+51 956 781223','Casa Naturista'),
(13,'CC Carmen','12345678901','/img/negocio/logo_vinocanchon.png','cccarmen@gmail.com','+51 956 781223','Centro Comercial el Carmen'),
(13,'CC Ameria','12345678901','/img/negocio/logo_vinocanchon.png','ccamerica@gmail.com','+51 956 781223','Centro Comercial las Amercias'),
(13,'El Molino','12345678901','/img/negocio/logo_vinocanchon.png','elmolino1@gmail.com','+51 956 781223','Centro Comercial el Molino'),
(13,'El Paraiso','12345678901','/img/negocio/logo_vinocanchon.png','elparaiso@gmail.com','+51 956 781223','Centro Comercial el Paraiso'),
(17,'Tours Trek Perú','12345678901','/img/negocio/logo_vinocanchon.png','tourstrek@gmail.com','+51 956 781223','Agencia de Turismo'),
(17,'Intu Machupicchu','12345678901','/img/negocio/logo_vinocanchon.png','inturmachupicchu@gmail.com','+51 956 781223','Agencia de Viajes a Machupicchu'),
(20,'Sistemas Cusco','12345678901','/img/negocio/logo_vinocanchon.png','sistemas@gmail.com','+51 956 781223','Tecnico de Computadoras e Impresoras'),
(20,'Claro','12345678901','/img/negocio/logo_vinocanchon.png','claro@gmail.com','+51 956 781223','Telecomunicaciones');



INSERT INTO tienda(idNegocio,idTipoNegocio,numeroTienda,nombreTienda,ruc,logo,correoTienda,telefonoTienda,direccionTienda,descripcionTienda,lat,lng) VALUES
(1,20,'R-P','Reactiva Perú','12345678901','/img/negocio/logo_reactiva.png','inforeactiva@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(2,2,'V-1','Eliana Verduras V-1','12345678901','/img/negocio/logo_vinocanchon.png','vinocanchon-v-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(2,3,'V-2','Justina Carnes V-2','12345678901','/img/negocio/logo_vinocanchon.png','vinocanchon-v-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(3,4,'Q-1','Marta Quesos Q-1','12345678901','/img/negocio/logo_wanchaq.png','wanchaq-q-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(3,5,'Q-2','Juan Jamones Q-2','12345678901','/img/negocio/logo_wanchaq.png','wanchaq-q-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(4,7,'G-1','La Granja Sanjeronimo','12345678901','/img/negocio/logo_lagranja.png','lagranja-g-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(4,7,'G-2','La Granja Prado','12345678901','/img/negocio/logo_lagranja.png','lagranja-g-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(5,8,'E-1','Etapoy Seminario','12345678901','/img/negocio/logo_etapoy.png','etapoy-e-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(5,8,'E-2','Etapoy Almagro','12345678901','/img/negocio/logo_etapoy.png','etapoy-e-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(6,9,'C-1','La Canasta Magisterio','12345678901','/img/negocio/logo_lacanasta.png','lacanasta-f-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(6,9,'C-2','La Canasta Sanjeronimo','12345678901','/img/negocio/logo_lacanasta.png','lacanasta-f-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(7,9,'O-1','Supermercados Orion Marcaballe','12345678901','/img/negocio/logo_orion.png','orion-o-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(7,9,'O-2','Supermercados Orion Santiago','12345678901','/img/negocio/logo_orion.png','orion-o-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(8,11,'H-1','Hampina Wassi Correo','12345678901','/img/negocio/logo_hampina.png','hampina-h-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(8,11,'H-2','Hampina Wassi Garcilazo','12345678901','/img/negocio/logo_hampina.png','hampina-h-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(9,12,'I-1','Inka Farma Seguro','12345678901','/img/negocio/logo_inkafarna.png','inka-i-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(9,12,'I-2','Inka Farma Control','12345678901','/img/negocio/logo_inkafarna.png','inka-i-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(10,14,'C-1','Impresoras C-1','12345678901','/img/negocio/logo_carmen.png','carmen-c-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(10,14,'C-2','Computadoras C-2','12345678901','/img/negocio/logo_carmen.png','carmen-c-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(11,14,'A-1','Celulares A-1','12345678901','/img/negocio/logo_america.png','america-a-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(11,15,'A-2','Computadoras A-2','12345678901','/img/negocio/logo_america.png','america-a-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(12,15,'M-1','Casacas M-1','12345678901','/img/negocio/logo_molino.png','molino-m-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(12,16,'M-2','Zapatos M-2','12345678901','/img/negocio/logo_molino.png','molino-m-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(13,15,'P-1','Polos P-1','12345678901','/img/negocio/logo_paraiso.png','paraiso-p-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(13,16,'P-2','Medias P-2','12345678901','/img/negocio/logo_paraiso.png','paraiso-p-2@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(14,18,'T-1','Tours Trek Perú','12345678901','/img/negocio/logo_tourstp.png','tours-t-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(15,19,'I-1','Intur Machupicchu','12345678901','/img/negocio/logo_inturmp.png','intur-m-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(16,21,'S-1','Sistemas Cusco','12345678901','/img/negocio/logo_sistemas.png','sistemas-s-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000'),
(17,22,'C-1','Claro','12345678901','/img/negocio/logo_claro.png','claro-c-1@gmail.com','+51 084 789067','Calle. Pastor N° 174','Desarrollo de soluciones','13.00000','75.00000');


INSERT INTO usuario(nombreUsuario,contrasena,tipoUsuario,codigoUsuario) VALUES
('reactiva-peru@gmail.com',SHA1('reactiva'),'admin',1),
('vinocanchon@gmail.com',SHA1('vino'),'negocio',2),
('mercadowanchaq@gmail.com',SHA1('wancha'),'negocio',3),
('lagranja@gmail.com',SHA1('granja'),'negocio',4),
('etapoy@gmail.com',SHA1('etapoy'),'negocio',5),
('lacanasta@gmail.com',SHA1('canasta'),'negocio',6),
('orion@gmail.com',SHA1('oriion'),'negocio',7),
('inkafarma@gmail.com',SHA1('inka'),'negocio',8),
('hampinawassi@gmail.com',SHA1('hampina'),'negocio',9),
('cccarmen@gmail.com',SHA1('carmen'),'negocio',10),
('ccamerica@gmail.com',SHA1('america'),'negocio',11),
('elmolino1@gmail.com',SHA1('molino'),'negocio',12),
('elparaiso@gmail.com',SHA1('paraiso'),'negocio',13),
('tourstrek@gmail.com',SHA1('tours'),'negocio',14),
('inturmachupicchu@gmail.com',SHA1('intur'),'negocio',15),
('sistemas@gmail.com',SHA1('sistemas'),'negocio',16),
('claro@gmail.com',SHA1('claro'),'negocio',17),
('inforeactiva@gmail.com',SHA1('reactiva'),'tienda',1),
('vinocanchon-v-1@gmail.com',SHA1('vino'),'tienda',2),
('vinocanchon-v-2@gmail.com',SHA1('vino'),'tienda',3),
('wanchaq-q-1@gmail.com',SHA1('wanchaq'),'tienda',4),
('wanchaq-q-2@gmail.com',SHA1('wanchaq'),'tienda',5),
('lagranja-g-1@gmail.com',SHA1('granja'),'tienda',6),
('lagranja-g-2@gmail.com',SHA1('granja'),'tienda',7),
('etapoy-e-1@gmail.com',SHA1('etapoy'),'tienda',8),
('etapoy-e-1@gmail.com',SHA1('etapoy'),'tienda',9),
('lacanasta-c-1@gmail.com',SHA1('canasta'),'tienda',10),
('lacanasta-c-2@gmail.com',SHA1('canasta'),'tienda',11),
('orion-o-1@gmail.com',SHA1('orion'),'tienda',12),
('orion-o-2@gmail.com',SHA1('orion'),'tienda',13),
('inka-i-1@gmail.com',SHA1('inka'),'tienda',14),
('inka-i-2@gmail.com',SHA1('inka'),'tienda',15),
('hampina-h-1@gmail.com',SHA1('hampina'),'tienda',16),
('hampina-h-2@gmail.com',SHA1('hampina'),'tienda',17),
('carmen-c-1@gmail.com',SHA1('carmen'),'tienda',18),
('carmen-c-2@gmail.com',SHA1('carmen'),'tienda',19),
('america-a-1@gmail.com',SHA1('america'),'tienda',20),
('america-a-2@gmail.com',SHA1('america'),'tienda',21),
('molino-m-1@gmail.com',SHA1('molino'),'tienda',22),
('molino-m-2@gmail.com',SHA1('molino'),'tienda',23),
('paraiso-p-1@gmail.com',SHA1('paraiso'),'tienda',24),
('paraiso-p-2@gmail.com',SHA1('paraiso'),'tienda',25),
('tours-t-1@gmail.com',SHA1('tours'),'tienda',26),
('intur-m-1@gmail.com',SHA1('intur'),'tienda',27),
('sistemas-s-1@gmail.com',SHA1('sistemas'),'tienda',28),
('claro-c-1@gmail.com',SHA1('claro'),'tienda',29);