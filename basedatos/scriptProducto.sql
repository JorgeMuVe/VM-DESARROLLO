USE vm;
/*
DELIMITER $$
DROP PROCEDURE IF EXISTS buscarCantidadProducto $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE buscarCantidadProducto (
    IN `@ciudad` VARCHAR(250),
    IN `@tipo` VARCHAR(250),
    IN `@texto` VARCHAR(250),
    IN `@idTienda` INT(10) unsigned,
    IN `@idNegocio` INT(10) unsigned,
    IN `@idTipoNegocio` INT(10) unsigned,
    IN `@idTipoProducto` INT(10) unsigned
) BEGIN

IF(`@tipo`='TODO') THEN
    SELECT COUNT(*) as cantidadProductos from producto p 
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto`;
END IF;
IF(`@tipo`='TIENDA') THEN
    SELECT COUNT(*) as cantidadProductos from producto p
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto` AND p.idTienda = `@idTienda`;
END IF;
IF(`@tipo`='NEGOCIO') THEN
    SELECT COUNT(*) as cantidadProductos from producto p
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND n.idNegocio = `@idNegocio` AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto`;
END IF;
IF(`@tipo`='TIPONEGOCIO') THEN
    SELECT COUNT(*) as cantidadProductos from producto p
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND n.idTipoNegocio = `@idTipoNegocio` AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto`;
END IF;
IF(`@tipo`='TIPOPRODUCTO') THEN
    SELECT COUNT(*) as cantidadProductos from producto p
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto` AND p.idTipoProducto = `@idTipoProducto`;
END IF;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS buscarProducto $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE buscarProducto (
    IN `@ciudad` VARCHAR(250),
    IN `@tipo` VARCHAR(250),
    IN `@texto` VARCHAR(250),
    IN `@idTienda` INT(10) unsigned,
    IN `@idNegocio` INT(10) unsigned,
    IN `@idTipoNegocio` INT(10) unsigned,
    IN `@idTipoProducto` INT(10) unsigned,
    IN `@inicio` INT(10) unsigned,
    IN `@cantidad` INT(10) unsigned
) BEGIN

IF(`@tipo`='TODO') THEN
    SELECT p.*, t.nombreTienda, n.idNegocio, n.nombreNegocio from producto p 
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto`
    LIMIT `@inicio`,`@cantidad`;
END IF;
IF(`@tipo`='TIENDA') THEN
    SELECT p.*, t.nombreTienda, n.idNegocio, n.nombreNegocio from producto p
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto` AND p.idTienda = `@idTienda`
    LIMIT `@inicio`,`@cantidad`;
END IF;
IF(`@tipo`='NEGOCIO') THEN
    SELECT p.*, t.nombreTienda, n.idNegocio, n.nombreNegocio from producto p
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND n.idNegocio = `@idNegocio` AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto`
    LIMIT `@inicio`,`@cantidad`;
END IF;
IF(`@tipo`='TIPONEGOCIO') THEN
    SELECT p.*, t.nombreTienda, n.idNegocio, n.nombreNegocio from producto p
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND n.idTipoNegocio = `@idTipoNegocio` AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto`
    LIMIT `@inicio`,`@cantidad`;
END IF;
IF(`@tipo`='TIPOPRODUCTO') THEN
    SELECT p.*, t.nombreTienda, n.idNegocio, n.nombreNegocio from producto p
    INNER JOIN tienda t ON p.idTienda = t.idTienda
    INNER JOIN negocio n ON n.idNegocio = t.idNegocio AND 'cusco' = `@ciudad`
    WHERE p.nombreProducto LIKE `@texto` AND p.detalleProducto LIKE `@texto` AND p.idTipoProducto = `@idTipoProducto`
    LIMIT `@inicio`,`@cantidad`;
END IF;
END $$
DELIMITER ;
-- CALL buscarProducto_('cusco','TIPOPRODUCTO','%ce%','0','0','0','2','0','10');
*/
-- == BUSCAR PRODUCTO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS buscarProducto; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE buscarProducto (
    IN `@tipo` VARCHAR(250),
    IN `@texto` VARCHAR(250),
    IN `@inicio` INT(10) unsigned,
    IN `@cantidad` INT(10) unsigned
) BEGIN

SELECT tp.nombreTipoProducto,p.nombreProducto,p.detalleProducto,p.imagenProducto,tp.imagenTipoProducto,
p.precioPorUnidad,p.unidadCantidad,p.tipoUnidad,p.descuentoUnidad,t.nombreTienda,p.idProducto,t.idTienda
FROM producto p INNER JOIN tipoProducto tp ON p.idTipoProducto = tp.idTipoProducto AND tp.nombreTipoProducto LIKE `@tipo`
INNER JOIN tienda t ON t.idTienda = p.idTienda 
WHERE p.nombreProducto LIKE `@texto` OR tp.nombreTipoProducto LIKE `@texto` LIMIT `@inicio`,`@cantidad`;

END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS paginadoProductoTienda; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE paginadoProductoTienda (
    IN `@codigoUsuario` VARCHAR(250),
    IN `@inicio` INT(10) unsigned,
    IN `@cantidad` INT(10) unsigned
) BEGIN

SELECT tp.nombreTipoProducto,p.nombreProducto,p.detalleProducto,p.imagenProducto,tp.imagenTipoProducto,
p.precioPorUnidad,p.unidadCantidad,p.tipoUnidad,p.descuentoUnidad,p.idProducto,tp.idTipoProducto 
FROM producto p INNER JOIN tipoProducto tp ON p.idTipoProducto = tp.idTipoProducto
WHERE p.idTienda = `@codigoUsuario` LIMIT `@inicio`, `@cantidad`;

END $$
DELIMITER ;

-- == LISTAR PRODUCTO POR TIPO ==>>
DELIMITER $$
DROP PROCEDURE IF EXISTS listarProductoPorTipo; $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE listarProductoPorTipo (
IN `@tipoProducto` INT(10)
) BEGIN

SELECT 
tn.nombreTipoNegocio,t.nombreTienda,tp.nombreTipoProducto,p.nombreProducto,p.detalleProducto,
p.precioPorUnidad,p.unidadCantidad,p.tipoUnidad,p.descuentoUnidad,tp.imagenTipoProducto,
p.idProducto,tp.idTipoProducto,t.idTienda,tn.idTipoNegocio
FROM producto p 
INNER JOIN tipoProducto tp 
ON p.idTipoProducto = tp.idTipoProducto 
AND tp.idTipoProducto = `@tipoProducto`
INNER JOIN tienda t ON t.idTienda = p.idTienda
INNER JOIN tipoNegocio tn ON tn.idTipoNegocio = t.idTipoNegocio;

END; $$
DELIMITER ;

/*
INSERT INTO producto(idTienda,idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto) VALUES
(2,2,'GR','Tomate Rojo','Tomates Rojos', 7.50 , 1000 , 10 ,'/img/productos/tomate.jpg'),
(2,2,'GR','Cebola Roja','Cebolla Roja', 5.00 , 1000 , 10 ,'/img/productos/cebolla.jpg'),
(2,2,'GR','Zanahoria','Zahanoria', 6.00 , 1000 , 10 ,'/img/productos/zanahoria.jpg'),
(4,3,'GR','Pollo','Pollo', 12.00 , 1000 , 10 ,'/img/productos/pollo.jpg'),
(4,3,'GR','Res','Res', 16.00 , 1000 , 10 ,'/img/productos/res.jpg'),
(4,3,'GR','Pescado','Pescado', 13.00 , 1000 , 10 ,'/img/productos/pescado.jpg'),
(5,4,'ML','Leche','Leche', 9.90 , 1000 , 10 ,'/img/productos/leche.jpg'),
(5,4,'GR','Queso','Queso', 8.00 , 1000 , 10 ,'/img/productos/queso.jpg'),
(5,4,'GR','Mantequilla','Mantequilla', 2.50 , 250 , 10 ,'/img/productos/huevo.jpg'),
(6,7,'PLATO','Pollo a la Braza 1/4','Pollo a la Braza', 15.00 , 1 , 10 ,'/img/productos/polloBraza.jpg'),
(7,7,'PLATO','Parrilla','Parilla', 10.00 , 1 , 10 ,'/img/productos/parrilla.jpg'),
(8,7,'PLATO','Anticucho','Anticucho', 10.00 , 1 , 10 ,'/img/productos/anticucho.jpg'),
(10,5,'ML','Geseosa','Geseosa', 5.00 , 1800 , 10 ,'/img/productos/gaseosa.jpg'),
(11,5,'ML','Agua','Agua', 2.50 , 1000 , 10 ,'/img/productos/agua.jpg'),
(12,5,'ML','Zumo','Zumo', 7.00 , 2000 , 10 ,'/img/productos/zumo.jpg'),
(12,6,'UNIDAD','Guantes/Barbigo','Guantes/Barbigo', 7.00 , 1 , 10 ,'/img/productos/guantes.jpg'),
(13,6,'BOTELLA','Clorox','Clorox', 5.50 , 1 , 10 ,'/img/productos/clorox.jpg'),
(13,6,'CAJA','Jabon','Jabon', 6.00 , 1 , 10 ,'/img/productos/jabon.jpg'),

(14,8,"ML","A 10 000 Vitamina a","Mason Natural",45.00,750,0,"/img/productos/hp/A-10-000-Vitamina-a.jpeg"),
(14,8,"ML","Aceite Cosmetico de Coco","Cia-Car-Lan",45.00,750,0,"/img/productos/hp/Aceite-Cosmetico-Coco.jpeg"),
(14,8,"ML","Aceite de Ajonjoli Extravirgen","Ecograins",45.00,750,0,"/img/productos/hp/Aceite-Ajonjoli-Extravirgen.jpeg"),
(14,8,"ML","Aceite de Almendra","Portugal",45.00,750,0,"/img/productos/hp/Aceite-Almendra-Portugal.jpeg"),
(14,8,"ML","Aceite de Almendra Extravirgen","Ecograins",45.00,750,0,"/img/productos/hp/Aceite-Almendra-Extravirgen.jpeg"),
(14,8,"ML","Aceite de Castaña Extravirgen","Ecograins",45.00,750,0,"/img/productos/hp/Aceite-Castana-Extravirgen.jpeg"),
(14,8,"ML","Aceite de Chia Extravirgen","Ecograins",45.00,750,0,"/img/productos/hp/Aceite-Chia-Extravirgen.jpeg"),
(14,8,"ML","Aceite de Coco 120 ML","Bio Selva",45.00,750,0,"/img/productos/hp/Aceite-Coco-120.jpeg"),
(14,8,"ML","Aceite de Coco 450 ML","Bio Selva",45.00,750,0,"/img/productos/hp/Aceite-Coco-450.jpeg"),
(14,8,"ML","Aceite de Coco Extravirgen","S'Natural",45.00,750,0,"/img/productos/hp/Aceite-Coco-Extravirgen-S-Natural-260.jpeg"),
(14,8,"ML","Aceite de Coco Extravirgen","S'Natural",45.00,750,0,"/img/productos/hp/Aceite-Coco-Extravirgen-S-Natural-490.jpeg"),
(14,8,"ML","Aceite de Coco Omega 6","Dashion Natural",45.00,750,0,"/img/productos/hp/Aceite-Coco-Omega-6.jpeg"),
(14,8,"ML","Aceite de Copaiba","Kaita",45.00,750,0,"/img/productos/hp/Aceite-Copaiba-Kaita.jpeg"),
(14,8,"ML","Aceite de Jojoba","Jomi",45.00,750,0,"/img/productos/hp/Aceite-Jojoba-Jomi.jpeg"),
(14,8,"ML","Aceite de la Rosa Mosqueta","Jami",45.00,750,0,"/img/productos/hp/Aceite-Rosa-Mosqueta-Jami.jpeg"),
(14,8,"ML","Aceite de Linaza Extravirgen","Ecograins",45.00,750,0,"/img/productos/hp/Aceite-Linaza-Extravirgen.jpeg"),
(14,8,"ML","Aceite de Muña","Sin Marca",45.00,750,0,"/img/productos/hp/Aceite-Muna-Artesanal.jpeg"),
(14,8,"ML","Aceite de Nuez de Argan","Terra Amazonas",45.00,750,0,"/img/productos/hp/Aceite-Nuez-Argan.jpeg"),
(14,8,"ML","Aceite de Oliva","Nina Alccacuntur",45.00,750,0,"/img/productos/hp/Aceite-de-Oliva.jpeg"),
(14,8,"ML","Aceite de Oliva Extravirgen","Dashion Natural",45.00,750,0,"/img/productos/hp/Aceite-Oliva-Extravirgen-S-Natural.jpeg"),
(14,8,"ML","Aceite de Oliva Extravirgen","S'Natural",45.00,750,0,"/img/productos/hp/Aceite-Oliva-Extravirgen.jpeg"),
(14,8,"ML","Aceite de Oliva Omega 3","Dashion Natural",45.00,750,0,"/img/productos/hp/Aceite-Oliva-Omega-3.jpeg"),
(14,8,"ML","Aceite de Oliva Virgen","Olivos del Valle",45.00,750,0,"/img/productos/hp/Aceite-Oliva-Virgen.jpeg"),
(14,8,"ML","Aceite de Sachainchi Extravirgen","Pasion Natural",45.00,750,0,"/img/productos/hp/Aceite-Sachainchi-Extravirgen.jpeg"),
(14,8,"ML","Aceite Escencial de Germen de Trigo","Sin Marca",45.00,750,0,"/img/productos/hp/Aceite-Escencial-Germen-Trigo.jpeg"),
(14,8,"ML","Aceite Escencial de Romero","Piramide Andina",45.00,750,0,"/img/productos/hp/Aceite-Escencial-Romero.jpeg"),
(14,8,"ML","Aceite Esencial Alcanfor","Artesanal",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Alcanfor.jpeg"),
(14,8,"ML","Aceite Esencial Almendras","Artesanal",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Almendras.jpeg"),
(14,8,"ML","Aceite Esencial Arbol de Te","Sin Marca",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Arbol-Te.jpeg"),
(14,8,"ML","Aceite Esencial Arrayan","Ampay",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Arrayan.jpeg"),
(14,8,"ML","Aceite Esencial Coco","Aroma Peru",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Coco.jpeg"),
(14,8,"ML","Aceite Esencial Jazmin","Artesanal",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Jazmin.jpeg"),
(14,8,"ML","Aceite Esencial Jojoba","Artesanal",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Jojoba.jpeg"),
(14,8,"ML","Aceite Esencial Lavanda","Artesanal",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Lavanda.jpeg"),
(14,8,"ML","Aceite Esencial Ortiga Negra","Artesanal",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Ortiga-Negra.jpeg"),
(14,8,"ML","Aceite Esencial Palo Santo","Ampay",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Palo-Santo.jpeg"),
(14,8,"ML","Aceite Esencial Rosa Mosqueta","Artesanal",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Rosa-Mosqueta.jpeg"),
(14,8,"ML","Aceite Esencial Tomillo","Artesanal",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Tomillo.jpeg"),
(14,8,"ML","Aceite Esencial Vainilla","Chandrika",45.00,750,0,"/img/productos/hp/Aceite-Esencial-Vainilla.jpeg"),
(14,8,"ML","Aceite Ricino","Rhodo",45.00,750,0,"/img/productos/hp/Aceite-Ricino-Rhodo.jpeg"),
(14,8,"ML","Achexial Purificador de Song","Natural Plus",45.00,750,0,"/img/productos/hp/Achexial-Purificador-Song.jpeg"),
(14,8,"ML","Achiote","Eco Plants",45.00,750,0,"/img/productos/hp/Achiote-Maravilla-Sana.jpeg"),
(14,8,"ML","Achiote","Hervid Natura",45.00,750,0,"/img/productos/hp/Achiote-Hervid-Natura-Capsula.jpeg"),
(14,8,"ML","Achiote","Maravilla Sana",45.00,750,0,"/img/productos/hp/Achiote-Ecoplants.jpeg"),
(14,8,"ML","Acnexial","Natural Pluss",45.00,750,0,"/img/productos/hp/Acnexial-Sibel-Capsula.jpeg"),
(14,8,"ML","Acondicionador Herbal","Junam",45.00,750,0,"/img/productos/hp/Acondicionador-Herbal-Junam.jpeg"),
(14,8,"ML","Adam Max Forte","Sibel",45.00,750,0,"/img/productos/hp/Adam-Max-Forte.jpeg"),
(14,8,"ML","Adelnatur","Hervid Natura",45.00,750,0,"/img/productos/hp/Adelnatur.jpeg"),
(14,8,"ML","Aguaje","Natural Medix",45.00,750,0,"/img/productos/hp/Aguaje-Sibel.jpeg"),
(14,8,"ML","Aguaje","Sibel",45.00,750,0,"/img/productos/hp/Aguaje-Natural-medix.jpeg"),
(14,8,"ML","Aguaje + Colageno","Sibel",45.00,750,0,"/img/productos/hp/Aguaje-+-colageno.jpeg"),
(14,8,"ML","Aguaje Premium","Natural Plus",45.00,750,0,"/img/productos/hp/Bebida-Aguaje-Premium.jpeg"),
(14,8,"ML","Alcachofa","Kaita",45.00,750,0,"/img/productos/hp/Alcachofa-Sibel.jpeg"),
(14,8,"ML","Alcachofa","Sibel",45.00,750,0,"/img/productos/hp/Alcachofa-Kaita.jpeg"),
(14,8,"ML","Alcamax","Kaita",45.00,750,0,"/img/productos/hp/Alcamax-Kaita.jpeg"),
(14,8,"ML","Alfalfa Antianemico","Oasis Salud",45.00,750,0,"/img/productos/hp/Alfalfa-Antianemico-Oasis-Salud.jpeg"),
(14,8,"ML","Algarrobina","Bircher Benner",45.00,750,0,"/img/productos/hp/Algarrobina-Bircher-Benner.jpeg"),
(14,8,"ML","Algas Marinas","Sibel",45.00,750,0,"/img/productos/hp/Algas-Marinas-Sibel.jpeg"),
(14,8,"ML","Aloe Vera","Sibel",45.00,750,0,"/img/productos/hp/Aloe-Vera-Sibel.jpeg"),
(14,8,"ML","Antioxidante","Sibel",45.00,750,0,"/img/productos/hp/Antioxidante.jpeg"),
(14,8,"ML","Apeplus","Sibel",45.00,750,0,"/img/productos/hp/Apeplus-Sibel.jpeg"),
(14,8,"ML","Arcilla Ecologica","Naturaleza Integral",45.00,750,0,"/img/productos/hp/Arcilla-Ecologica-Naturaleza.jpeg"),
(14,8,"ML","Arcilla Mineral Andina","Naturaleza Integral",45.00,750,0,"/img/productos/hp/Arcilla-Mineral-Andina.jpeg"),
(14,8,"ML","Arcilla Recurso Natural","Geomedical",45.00,750,0,"/img/productos/hp/Arcilla-Geomedical.jpeg"),
(14,8,"ML","Asma Pulmin","Maravilla Sana",45.00,750,0,"/img/productos/hp/Asma-Pulmin.jpeg"),
(14,8,"ML","Ba Zheng San","Milenaria",45.00,750,0,"/img/productos/hp/Ba-Zheng-San.jpeg"),
(14,8,"ML","Bahia Solar Faces Bloqueador","Portugal",45.00,750,0,"/img/productos/hp/Bahia-Solar-Faces-Bloqueador.jpeg"),
(14,8,"ML","Balsamo Antireumatico Molle","Oro Verde",45.00,750,0,"/img/productos/hp/Balsamo-Antireumatico-Molle.jpeg"),
(14,8,"ML","Bebida de Manzana y Antideprecion","Paracelso",45.00,750,0,"/img/productos/hp/Bebida-Manzana-Antideprecion.jpeg"),
(14,8,"ML","Bebida de Manzana y Antiestres","Paracelso",45.00,750,0,"/img/productos/hp/Bebida-Manzana-Antiestres.jpeg"),
(14,8,"ML","Bebida de Manzana y Antinerviosismo","Paracelso",45.00,750,0,"/img/productos/hp/Bebida-Manzana-Olivo-Antinerviosismo.jpeg"),
(14,8,"ML","Bebida de Manzana y Olivo Relax","Paracelso",45.00,750,0,"/img/productos/hp/Bebida-Manzana-Olivo-Relax.jpeg"),
(14,8,"ML","Bebida Energizante Collagen","Healthy Body",45.00,750,0,"/img/productos/hp/Bebida-Energisante-Collagen.jpeg"),
(14,8,"ML","Bebida Energizante FT-OUT","Winper Nutrition",45.00,750,0,"/img/productos/hp/Energisante-FT-OUT.jpeg"),
(14,8,"ML","Benzo Derma Urguento","HG Laboratorios",45.00,750,0,"/img/productos/hp/Benzo-Derma-Urguento.jpeg"),
(14,8,"ML","Bicarbonato de Sodio","Laboratorio Farmali",45.00,750,0,"/img/productos/hp/Bicarbonato-de-Sodio.jpeg"),
(14,8,"ML","Black Tea","Bostar",45.00,750,0,"/img/productos/hp/Black-Tea-Bostar.jpeg"),
(14,8,"ML","Boldo","Eco Plants",45.00,750,0,"/img/productos/hp/Boldo-Ecoplants.jpeg"),
(14,8,"ML","Buenas Noches","Schagreen",45.00,750,0,"/img/productos/hp/Buenas-Noches-Schagreen.jpeg"),
(14,8,"ML","C 500 Vitamina c","Mason Natural",45.00,750,0,"/img/productos/hp/C-500-Vitamina-c.jpeg"),
(14,8,"ML","Cacha Lagua","Sibel",45.00,750,0,"/img/productos/hp/Cachalaguna-Sibel.jpeg"),
(14,8,"ML","Camu Camu Vitamina C","Sibel",45.00,750,0,"/img/productos/hp/Camu-Camu-Vitamina-C-Sibel.jpeg"),
(14,8,"ML","Canchalagua","Sibel",45.00,750,0,"/img/productos/hp/Canchalagua-Sibel-Capsula.jpeg"),
(14,8,"ML","Canchalagua Max","Kaita",45.00,750,0,"/img/productos/hp/Canchalagua-Max.jpeg"),
(14,8,"ML","Carbon Activado","Sibel",45.00,750,0,"/img/productos/hp/Carbon-Activado-Sibel.jpeg"),
(14,8,"ML","Cardo Mariano","Sibel",45.00,750,0,"/img/productos/hp/Cardo-Mariano-Sibel-100.jpeg"),
(14,8,"ML","Cardo Mariano","Sibel",45.00,750,0,"/img/productos/hp/Cardo-Mariano-Sibel-60.jpeg"),
(14,8,"ML","Carticolageno","Herbalmax-Peru",45.00,750,0,"/img/productos/hp/Carticolageno-Sibel.jpeg"),
(14,8,"ML","Carticolageno","Sibel",45.00,750,0,"/img/productos/hp/Carticolageno-Hidrolizado-Herbalmax.jpeg"),
(14,8,"ML","Carticolageno","Sibel",45.00,750,0,"/img/productos/hp/Carticolageno-sibel-capsulas.jpeg"),
(14,8,"ML","Carticolageno Hidrolizado","Sibel",45.00,750,0,"/img/productos/hp/Carticolageno-sibel-polvo.jpeg"),
(14,8,"ML","Cartilago de Tiburon","Kaita",45.00,750,0,"/img/productos/hp/Cartilago-Tiburon-Sibel-Capsula.jpeg"),
(14,8,"ML","Cartilago de Tiburon","Sibel",45.00,750,0,"/img/productos/hp/Cartilago-de-Tiburon-kaita.jpeg"),
(14,8,"ML","Cerefort","Kaita",45.00,750,0,"/img/productos/hp/Cerefort-Kaita-Capsula.jpeg"),
(14,8,"ML","CER-EFORT B-12","Natural Plus",45.00,750,0,"/img/productos/hp/CER-EFORT-B-12.jpeg"),
(14,8,"ML","Cerefort Max","Kaita",45.00,750,0,"/img/productos/hp/Cerefort-Max.jpeg"),
(14,8,"ML","Chanca Piedra","Hervid Natura",45.00,750,0,"/img/productos/hp/Chanca-Piedra-Sibel-Capsula.jpeg"),
(14,8,"ML","Chanca Piedra","Kaita",45.00,750,0,"/img/productos/hp/Chanca-Piedra-Kaita.jpeg"),
(14,8,"ML","Chanca Piedra","Sibel",45.00,750,0,"/img/productos/hp/Chanca-Piedra-Hervid-natura.jpeg"),
(14,8,"ML","Chikimiel","Kaita",45.00,750,0,"/img/productos/hp/Chikimiel-Kaita.jpeg"),
(14,8,"ML","Chikinoni","Kaita",45.00,750,0,"/img/productos/hp/Chikinoni-Kaita.jpeg"),
(14,8,"ML","Cloruro de Magnesio","Sibel",45.00,750,0,"/img/productos/hp/Cloruro-de-Magnesio.jpeg"),
(14,8,"ML","Cloruro de Magnesio Forte","Sibel",45.00,750,0,"/img/productos/hp/Cloruro-de-Magnesio-Forte.jpeg"),
(14,8,"ML","Coca","Maravilla Sana",45.00,750,0,"/img/productos/hp/Coca-Maravilla.jpeg"),
(14,8,"ML","Coca con Extracto de Arnica","Cipronas",45.00,750,0,"/img/productos/hp/Coca-Extracto-Arnica-Cipronag.jpeg"),
(14,8,"ML","Colageno","Kaita",45.00,750,0,"/img/productos/hp/Colageno-Kaita-Capsula.jpeg"),
(14,8,"ML","Colageno Doblemente Hidrolizado","Sibel",45.00,750,0,"/img/productos/hp/Colageno-Doblemente-Hidrolizado.jpeg"),
(14,8,"ML","Colageno Hidrolizado","Herbalmax-Peru",45.00,750,0,"/img/productos/hp/Colageno-Hidrolizado-Herbalmax.jpeg"),
(14,8,"ML","Colageno Hidrolizado","Sibel",45.00,750,0,"/img/productos/hp/Colageno-Hidrolizado-Sibel.jpeg"),
(14,8,"ML","Colageno Hidrolizado + Cloruro de Magnesio","Herbalmax-Peru",45.00,750,0,"/img/productos/hp/Colageno-Hidrolizado-Cloruro-Magnesio.jpeg"),
(14,8,"ML","Colesnatur","Hervid Natura",45.00,750,0,"/img/productos/hp/Colesnatur-Sibel-Capsula.jpeg"),
(14,8,"ML","Colirio Chino","Lasabell",45.00,750,0,"/img/productos/hp/Colirio-Chino-Lasabell.jpeg"),
(14,8,"ML","Colirio Sabila","Sin Marca",45.00,750,0,"/img/productos/hp/Colirio-Natural-Aloe-Sabila.jpeg"),
(14,8,"ML","Colirio Sabila y Zanahoria","Sin Marca",45.00,750,0,"/img/productos/hp/Colirio-Natural-Sabila-Zanahoria.jpeg"),
(14,8,"ML","Colon Clean","Herbalmax-Peru",45.00,750,0,"/img/productos/hp/Colon-Clean-Herbalmax.jpeg"),
(14,8,"ML","Colon Cleanse","Kaita",45.00,750,0,"/img/productos/hp/Colon-Cleanse.jpeg"),
(14,8,"ML","Colon Plus","Sibel",45.00,750,0,"/img/productos/hp/Colon-Plus-Sibel.jpeg"),
(14,8,"ML","Concha de Nacar Jabon Exfoliante","Jaboneria Leos",45.00,750,0,"/img/productos/hp/Concha-Nacar-Jabon.jpeg"),
(14,8,"ML","Crema de Coco","Dashion Natural",45.00,750,0,"/img/productos/hp/Crema-Coco-Dashion-250.jpeg"),
(14,8,"ML","Crema de Coco","Dashion Natural",45.00,750,0,"/img/productos/hp/Crema-Coco-Dashion-500.jpeg"),
(14,8,"ML","Crema de Concha de Nacar","Kaita",45.00,750,0,"/img/productos/hp/Crema-Concha-Nacar-Sibel.jpeg"),
(14,8,"ML","Crema de Concha de Nacar","Sibel",45.00,750,0,"/img/productos/hp/Crema-Concha-Nacar-Kaita.jpeg"),
(14,8,"ML","Crema Triple Regeneradora","Sibel",45.00,750,0,"/img/productos/hp/Crema-Triple-Regeneradora.jpeg"),
(14,8,"ML","Curcuma ","Kaita",45.00,750,0,"/img/productos/hp/Curcuma-Kaita-Capsula.jpeg"),
(14,8,"ML","Curcuma de la Andina","Sibel",45.00,750,0,"/img/productos/hp/Curcuma-Andina-Sibel.jpeg"),
(14,8,"ML","Delga Light","La Salud",45.00,750,0,"/img/productos/hp/Delga-Light-La-Salud.jpeg"),
(14,8,"ML","Demoledor Forte Plus","Sibel",45.00,750,0,"/img/productos/hp/Demoledor-Forte-Plus.jpeg"),
(14,8,"ML","Desencil","Kaita",45.00,750,0,"/img/productos/hp/Desencil-Kaita.jpeg"),
(14,8,"ML","Desinflamante Organico","Hierba Santa",45.00,750,0,"/img/productos/hp/Desinflamante-Organico-Hierba-Santa.jpeg"),
(14,8,"ML","Diente de Leon","Sibel",45.00,750,0,"/img/productos/hp/Diente-Leon-Sibel.jpeg"),
(14,8,"ML","Diente de Leon","Sibel",45.00,750,0,"/img/productos/hp/Diente-Leon-Sibel-Capsula.jpeg"),
(14,8,"ML","Dietsen Tea","Plan 30 Dias",45.00,750,0,"/img/productos/hp/Dietsen-Tea.jpg"),
(14,8,"ML","Dral","Kaita",45.00,750,0,"/img/productos/hp/Dral-kaita.jpeg"),
(14,8,"ML","Dulces Sueños","Wawasana",45.00,750,0,"/img/productos/hp/Dulces-Suenios.jpg"),
(14,8,"ML","E 400 Vitamina e","Mason Natural",45.00,750,0,"/img/productos/hp/E-400-Vitamina-e.jpeg"),
(14,8,"ML","Energisol","Kaita",45.00,750,0,"/img/productos/hp/Energisol-Kaita.jpeg"),
(14,8,"ML","Energisol Kids","Kaita",45.00,750,0,"/img/productos/hp/Energisol-Kids-Kaita.jpeg"),
(14,8,"ML","Enjuague Bucal","Up Essencia",45.00,750,0,"/img/productos/hp/Enjuague-Bucal-Up-Essencia.jpeg"),
(14,8,"ML","Epsom Salt Cristalizado","Sin Marca",45.00,750,0,"/img/productos/hp/Epsom-Salt-Cristalizado.jpeg"),
(14,8,"ML","Estevia Natural","Naturaleza Boliviana",45.00,750,0,"/img/productos/hp/Estevia-Natural-250GR.jpeg"),
(14,8,"ML","Estevia Natural","Naturaleza Boliviana",45.00,750,0,"/img/productos/hp/Estevia-Natural-80GR.jpeg"),
(14,8,"ML","Exfoliante Facial","Nevada",45.00,750,0,"/img/productos/hp/Exfoliante-Facial.jpeg"),
(14,8,"ML","Facial Cleanser","Nevada",45.00,750,0,"/img/productos/hp/Facial-Cleanser-Nevada.jpeg"),
(14,8,"ML","Fat Burner","Sibel",45.00,750,0,"/img/productos/hp/Fat-Burner-Sibel-Capsula.jpeg"),
(14,8,"ML","Fat Burner Gel","Sin Marca",45.00,750,0,"/img/productos/hp/Fat-Burner-Gel.jpeg"),
(14,8,"ML","Femenina","Sibel",45.00,750,0,"/img/productos/hp/Femenina-Capsula-Sibel.jpeg"),
(14,8,"ML","Femenina Forte Plus","Sibel",45.00,750,0,"/img/productos/hp/Femenina-Liquido.jpeg"),
(14,8,"ML","Fenogreco","Ecuanatur",45.00,750,0,"/img/productos/hp/Fenogreco-ecuanatur.jpeg"),
(14,8,"ML","Fenogreco","Natural Medix",45.00,750,0,"/img/productos/hp/Fenogreco-Natural-Medix.jpeg"),
(14,8,"ML","Floresta Extremo","Portugal",45.00,750,0,"/img/productos/hp/Floresta-Extremo-Portugal.jpeg"),
(14,8,"ML","Full Whey Vainilla","Nutritium",45.00,750,0,"/img/productos/hp/Full-Whey-Vainilla.jpeg"),
(14,8,"ML","Gamma Forte Plus","Sibel",45.00,750,0,"/img/productos/hp/Gamma-Forte-Plus-Sibel.jpeg"),
(14,8,"ML","Ganoderma","Kaita",45.00,750,0,"/img/productos/hp/Ganoderma-Kaita-Capsula.jpeg"),
(14,8,"ML","Ganoderma Lucidum","Fungi Amazunica",45.00,750,0,"/img/productos/hp/Ganoderma-Lucidum-Milenaria.jpeg"),
(14,8,"ML","Ganoderma Lucidum","Milenaria",45.00,750,0,"/img/productos/hp/Ganoderma-Lucidum-Fungi-Gotero.jpeg"),
(14,8,"ML","Garcinia Cambogia con Cafe Verde","Kaita",45.00,750,0,"/img/productos/hp/Garcinia-Cambogia-con-Cafe-Verde.jpeg"),
(14,8,"ML","Garlic Oil","Mason Natural",45.00,750,0,"/img/productos/hp/Garlic-Oil.jpeg"),
(14,8,"ML","Gastri Plus","Sibel",45.00,750,0,"/img/productos/hp/Gastri-Plus-Sibel.jpeg"),
(14,8,"ML","Gel Aloe Vera","Sibel",45.00,750,0,"/img/productos/hp/Gel-Aloe-Vera.jpeg"),
(14,8,"ML","Gel Barro Biologico","Bio Naturista",45.00,750,0,"/img/productos/hp/Gel-Barro-Biologico.jpeg"),
(14,8,"ML","Gel Colageno Hidrolizado","Sibel",45.00,750,0,"/img/productos/hp/Colageno-Hidrolizado.jpeg"),
(14,8,"ML","Gel Dental Multibeneficios","Up Essencia",45.00,750,0,"/img/productos/hp/Gel-Dental-Up-Essencia.jpeg"),
(14,8,"ML","Gel Gelito Bendito","Bio Naturista",45.00,750,0,"/img/productos/hp/Gel-Gelito-Bendito.jpeg"),
(14,8,"ML","Gerifem","Sibel",45.00,750,0,"/img/productos/hp/Gerifem-Sibel.jpeg"),
(14,8,"ML","Ginko Biloba","Mason Natural",45.00,750,0,"/img/productos/hp/Ginkgo-Biloba.jpeg"),
(14,8,"ML","Ginseng Ginkgo Biloba","Milenaria",45.00,750,0,"/img/productos/hp/Ginseng-Ginkgo-Biloba.jpeg"),
(14,8,"ML","Ginseng Root Drink","Savia",45.00,750,0,"/img/productos/hp/Ginseng-Root-Drink.jpeg"),
(14,8,"ML","Ginseng Vitaly","Milenaria",45.00,750,0,"/img/productos/hp/Ginseng-Vitality.jpeg"),
(14,8,"ML","Gloarun Glucose","Ecuanatur",45.00,750,0,"/img/productos/hp/Gloarun-Glucose-Ecuanatur.jpeg"),
(14,8,"ML","Gorgojo Aciatico","Milenaria",45.00,750,0,"/img/productos/hp/Gorgojo-Asiatico.jpeg"),
(14,8,"ML","Gotas Milgrasosas","Centro Americano",45.00,750,0,"/img/productos/hp/Gotas-Milgrasosas-Centro-Americano.jpeg"),
(14,8,"ML","Graviola","Sibel",45.00,750,0,"/img/productos/hp/Graviola-Sibel-Capsula.jpeg"),
(14,8,"ML","Green Gin Tea","King's",45.00,750,0,"/img/productos/hp/Green-Gin-Tea.jpeg"),
(14,8,"ML","Green Seng","Botanical's",45.00,750,0,"/img/productos/hp/Green-Seng.jpeg"),
(14,8,"ML","H+R Pluss Bebida","Natural Plus",45.00,750,0,"/img/productos/hp/H+R-Pluss-Bebida.jpeg"),
(14,8,"ML","Harina de Aguaje","Sibel",45.00,750,0,"/img/productos/hp/Harina-de-Aguaje.jpeg"),
(14,8,"ML","Harina de Ajonjoli","Nutri Mix",45.00,750,0,"/img/productos/hp/Harina-Ajonjoli-Nutri-Mix.jpeg"),
(14,8,"ML","Harina de Alcachofa","Nutri Mix",45.00,750,0,"/img/productos/hp/Harina-Alcachofa-Nutri-Mix.jpeg"),
(14,8,"ML","Harina de Algas Marinas","Sibel",45.00,750,0,"/img/productos/hp/Harina-de-Algas-Marinas.jpeg"),
(14,8,"ML","Harina de Alpiste","Nutri Damel",45.00,750,0,"/img/productos/hp/Harina-Alpiste-Nutri-Damel.jpeg"),
(14,8,"ML","Harina de Alpiste","Nutri Mix",45.00,750,0,"/img/productos/hp/Harina-Alpiste-Nutri-Mix.jpeg"),
(14,8,"ML","Harina de camu camu","Sibel",45.00,750,0,"/img/productos/hp/Harina-de-camu-camu.jpeg"),
(14,8,"ML","Harina de Coca","Nutri Mix",45.00,750,0,"/img/productos/hp/Harina-Coca-Nutri-Mix.jpeg"),
(14,8,"ML","Harina de Curcuma","Sibel",45.00,750,0,"/img/productos/hp/Harina-Curcuma-Sibel.jpeg"),
(14,8,"ML","Harina de levadura de Cerveza","Sibel",45.00,750,0,"/img/productos/hp/Harina-de-levadura-de-Cerveza.jpeg"),
(14,8,"ML","Harina de Linaza","Nutri Mix",45.00,750,0,"/img/productos/hp/Harina-Linaza-Nutri-Mix.jpeg"),
(14,8,"ML","Harina de Mashua Negra","Bio Aurora",45.00,750,0,"/img/productos/hp/Harina-Mashua-Negra-Bio-Aurora.jpeg"),
(14,8,"ML","Herectuns","Hervid Natura",45.00,750,0,"/img/productos/hp/Herectuns-S-Natural.jpeg"),
(14,8,"ML","Herectuns","S'Natural",45.00,750,0,"/img/productos/hp/Herectuns-Hervid-Natura.jpeg"),
(14,8,"ML","Hergasol","Kaita",45.00,750,0,"/img/productos/hp/Hergasol-Kaita.jpeg"),
(14,8,"ML","Hervaril","Kaita",45.00,750,0,"/img/productos/hp/Hervaril.jpeg"),
(14,8,"ML","HFEM","Kaita",45.00,750,0,"/img/productos/hp/HFEM-kaita.jpeg"),
(14,8,"ML","HGH Releasing","Xtra Life",45.00,750,0,"/img/productos/hp/HGH-Releasing.jpeg"),
(14,8,"ML","Hierbas Andinas Digestivo","Wawasana",45.00,750,0,"/img/productos/hp/Hierbas-Andinas-Digestivo-Wawasana.jpeg"),
(14,8,"ML","Higa Plus","Sibel",45.00,750,0,"/img/productos/hp/Higa-Plus-Sibel.jpeg"),
(14,8,"ML","Hoja de Estebia","Eco Plants",45.00,750,0,"/img/productos/hp/Hoja-Estebia-Ecoplants.jpeg"),
(14,8,"ML","Hongo Derma Fungicida","Oro Verde",45.00,750,0,"/img/productos/hp/Hongo-Derma-Fungicida-Oro-Verde.jpeg"),
(14,8,"ML","Huanarpo Macho","Sibel",45.00,750,0,"/img/productos/hp/Huanarpo-Macho-Sibel.jpeg"),
(14,8,"ML","Huatuo Zai Zoo Wan","Milenaria",45.00,750,0,"/img/productos/hp/Huatuo-Zai-Zoo-Wan.jpeg"),
(14,8,"ML","Inferno","Winner Nutrition",45.00,750,0,"/img/productos/hp/Inferno-Energy-Winner.jpg"),
(14,8,"ML","ISO Fuxion Woman Vainilla","Nutritium",45.00,750,0,"/img/productos/hp/ISO-Fuxion-Woman.jpeg"),
(14,8,"ML","Jabon Aloe Vera Sabila","Machita",45.00,750,0,"/img/productos/hp/Jabon-Aloe-Vera-Sabila.jpeg"),
(14,8,"ML","Jabon Baba de Caracol","Natur Ecologico",45.00,750,0,"/img/productos/hp/Jabon-Baba-Caracol-Natur.jpeg"),
(14,8,"ML","Jabon con Colageno","Mopchita",45.00,750,0,"/img/productos/hp/Jabon-Colageno-Natur-Ecologico.jpeg"),
(14,8,"ML","Jabon con Colageno","Natur Ecologico",45.00,750,0,"/img/productos/hp/Jabon-Colageno-Mopchita.jpeg"),
(14,8,"ML","Jabon con Colageno Blanqueador","Cosmo Natura",45.00,750,0,"/img/productos/hp/Jabon-Colageno-Cosmo-Natura.jpeg"),
(14,8,"ML","Jabon de Avena","Jaboneria Venus",45.00,750,0,"/img/productos/hp/Jabon-Avena-Venus.jpeg"),
(14,8,"ML","Jabon de Avena","Natur Ecologico",45.00,750,0,"/img/productos/hp/Jabon-Avena-Natur-Ecologico.jpeg"),
(14,8,"ML","Jabon de Coco","Sami Natur",45.00,750,0,"/img/productos/hp/Jabon-Coco-Sami-Natur.jpeg"),
(14,8,"ML","Jabon Hiel de Vaca","Lima",45.00,750,0,"/img/productos/hp/Jabon-Hiel-Vaca.jpeg"),
(14,8,"ML","Jabon Hongosan","Jaboneria Venus",45.00,750,0,"/img/productos/hp/Jabon-Hongosan-Venus.jpeg"),
(14,8,"ML","Jabon Hungosa Plus","Jaboneria Venus",45.00,750,0,"/img/productos/hp/Jabon-Hungosa-Plus-Venus.jpeg"),
(14,8,"ML","Jabon Matico","Jaboneria Venus",45.00,750,0,"/img/productos/hp/Jabon-Matico-Venus.jpeg"),
(14,8,"ML","Jabon Sangre de Grado","Jaboneria Venus",45.00,750,0,"/img/productos/hp/Jabon-Sangre-Grado-Venus.jpeg"),
(14,8,"ML","Jabon Suena","Natur Ecologico",45.00,750,0,"/img/productos/hp/Jabon-Suena-Natur-Ecologico.jpeg"),
(14,8,"ML","Jarabe los Ficus T.B.A","Herboresteria los Ficus",45.00,750,0,"/img/productos/hp/Jarabe-Ficus-T-B-A.jpeg"),
(14,8,"ML","Korean Ginseng Tea","Inkamax",45.00,750,0,"/img/productos/hp/Korean-Ginseng-Tea.jpeg"),
(14,8,"ML","Lavender Talco Perfumado","Nevada",45.00,750,0,"/img/productos/hp/Lavender-Talco-Perfumado.jpeg"),
(14,8,"ML","Laximol","Kaita",45.00,750,0,"/img/productos/hp/Laximol-kaita.jpeg"),
(14,8,"ML","Levadura de Cerveza","Ecuanatu",45.00,750,0,"/img/productos/hp/Levadura-Cerveza-Sibel.jpeg"),
(14,8,"ML","Levadura de Cerveza","Sibel",45.00,750,0,"/img/productos/hp/Levadura-Cerveza-Ecuanatu.jpeg"),
(14,8,"ML","Levadura de Cerveza con Maca","Kaita",45.00,750,0,"/img/productos/hp/Levadura-de-Cerveza-con-Maca.jpeg"),
(14,8,"ML","Licor de Propoleo","Apicola y Derivados",45.00,750,0,"/img/productos/hp/Licor-Propoleo-Apicola-Derivados.jpeg"),
(14,8,"ML","Lipo Slim","Herbanny",45.00,750,0,"/img/productos/hp/Lipo-Slim-Herbanny.jpeg"),
(14,8,"ML","Lipsaliv Barra Mantequilla de Cacao","Portugal",45.00,750,0,"/img/productos/hp/Lipsaliv-Barra-Mantequilla-Cacao.jpeg"),
(14,8,"ML","Locion Fungicida Callo y Verruga","Oro Verde",45.00,750,0,"/img/productos/hp/Locion-Fungicida-Callo-Verruga.jpeg"),
(14,8,"ML","Locion Para Cuerpo Almond Oil y Milk","A-Marine",45.00,750,0,"/img/productos/hp/Almond-Oil-Milk.jpeg"),
(14,8,"ML","Locion Para Cuerpo Vitamin E Elastin","A-Marine",45.00,750,0,"/img/productos/hp/Vitamin-E-Elastin.jpeg"),
(14,8,"ML","Maca","Kaita",45.00,750,0,"/img/productos/hp/Maca-S-Natural.jpeg"),
(14,8,"ML","Maca","S'Natural",45.00,750,0,"/img/productos/hp/maca-kaita.jpeg"),
(14,8,"ML","Maca & Gin Seng","Sibel",45.00,750,0,"/img/productos/hp/Maca-y-Gin-Seng.jpeg"),
(14,8,"ML","Maca + Gin Seng","Natural Plus",45.00,750,0,"/img/productos/hp/Maca-+-Gin-Seng.jpeg"),
(14,8,"ML","Maca Negra","Milenaria",45.00,750,0,"/img/productos/hp/Maca-Negra-Milenaria.jpeg"),
(14,8,"ML","Maca Negra","Natural's Premium",45.00,750,0,"/img/productos/hp/Maca-Negra-Naturals-Premium.jpeg"),
(14,8,"ML","Maca Roja","Natura Mix",45.00,750,0,"/img/productos/hp/Maca-Roja-S-Natural.jpeg"),
(14,8,"ML","Maca Roja","S'Natural",45.00,750,0,"/img/productos/hp/Maca-Roja-Natura-Mix-Capsula.jpeg"),
(14,8,"ML","Macadamia","Beia",45.00,750,0,"/img/productos/hp/Macadamia-Beia.jpeg"),
(14,8,"ML","Macavit","Corporacion Andina",45.00,750,0,"/img/productos/hp/Macavit-Corporacion-Andina.jpeg"),
(14,8,"ML","Maiz Morado","Natural Medix",45.00,750,0,"/img/productos/hp/Maiz-Morado-Natural-Medix.jpeg"),
(14,8,"ML","Manayupa","Sibel",45.00,750,0,"/img/productos/hp/Manayupa-Sibel.jpeg"),
(14,8,"ML","Mascarilla Facil de Barro Black Mask","Do Beauty",45.00,750,0,"/img/productos/hp/Mascarilla-Facil-Barro-Black-Mask.jpeg"),
(14,8,"ML","Menta con Muña","Plan 30 Dias",45.00,750,0,"/img/productos/hp/Menta-con-Munia.jpeg"),
(14,8,"ML","Mi Nonito","Sibel",45.00,750,0,"/img/productos/hp/Mi-Nonito-Sibel.jpeg"),
(14,8,"ML","Miel con Propoleo","Apicola y Derivados",45.00,750,0,"/img/productos/hp/Miel-Propoleo-Apicola-Derivados.jpeg"),
(14,8,"ML","Miel de Abeja Mielito","Oxapampa",45.00,750,0,"/img/productos/hp/Miel-Abeja-Mielito-Oxapampa.jpeg"),
(14,8,"ML","Mintus Plus","Kaita",45.00,750,0,"/img/productos/hp/Mintus-Plus-Kaita.jpeg"),
(14,8,"ML","Molle Arnica Romero","Hierba Santa",45.00,750,0,"/img/productos/hp/Molle-Arnica-Romero-Hierba-Santa-100.jpeg"),
(14,8,"ML","Molle Arnica Romero","Hierba Santa",45.00,750,0,"/img/productos/hp/Molle-Arnica-Romero-Hierba-Santa-12.jpeg"),
(14,8,"ML","Moringa","Sibel",45.00,750,0,"/img/productos/hp/Moringa-sibel.jpeg"),
(14,8,"ML","Multi Cal Premiun","Maravilla Sana",45.00,750,0,"/img/productos/hp/Multi-Cal-Premiun.jpeg"),
(14,8,"ML","Multi Kids Energizante","Herbalmax Peru",45.00,750,0,"/img/productos/hp/Multi-Kids-Energizante.jpeg"),
(14,8,"ML","Nacre Shell Soap","Juman",45.00,750,0,"/img/productos/hp/Nacre-Shell-Soap-Junam.jpeg"),
(14,8,"ML","N-Fitina","Live Life",45.00,750,0,"/img/productos/hp/N-Fitina.jpeg"),
(14,8,"ML","Noni","Sibel",45.00,750,0,"/img/productos/hp/Noni-Sibel.jpeg"),
(14,8,"ML","Noni/Anona Graviola (Anticancerigeno)","Oasis Salud",45.00,750,0,"/img/productos/hp/Noni-Anona-Graviola.jpeg"),
(14,8,"ML","Nutri Light con Te Verde","Nutri Mix",45.00,750,0,"/img/productos/hp/Nutri-Light-Te-Verde.jpeg"),
(14,8,"ML","Omega-3","Mason Natural",45.00,750,0,"/img/productos/hp/Omega-3.jpeg"),
(14,8,"ML","Organic Moringa","Sibel",45.00,750,0,"/img/productos/hp/Organic-Moringa-Sibel-Capsula.jpeg"),
(14,8,"ML","Ortiga Herb Extracto Natural","Jumam",45.00,750,0,"/img/productos/hp/Ortiga-Herb-Extracto-Natural.jpeg"),
(14,8,"ML","Ortiga Negra","Sibel",45.00,750,0,"/img/productos/hp/Ortiga-Negra-Sibel.jpeg"),
(14,8,"ML","Osos","Sibel",45.00,750,0,"/img/productos/hp/Osos.jpeg"),
(14,8,"ML","Oste Flex","Herbalmax-Peru",45.00,750,0,"/img/productos/hp/Oste-Flex.jpeg"),
(14,8,"ML","Pacifis","Kaita",45.00,750,0,"/img/productos/hp/Pacifis-Kaita.jpeg"),
(14,8,"ML","Pacifis","Kaita",45.00,750,0,"/img/productos/hp/Pacifis-capsulas.jpeg"),
(14,8,"ML","Pacifis Max","Kaita",45.00,750,0,"/img/productos/hp/Pacifis-Max.jpeg"),
(14,8,"ML","Parasitolax Si Jun Zi Tan","Milenaria",45.00,750,0,"/img/productos/hp/Parasitolax-Si-Jun-Zi-Tan.jpeg"),
(14,8,"ML","Parche Leon","Briersdort",45.00,750,0,"/img/productos/hp/Parche-Leon.jpeg"),
(14,8,"ML","Penca de Luna","Sibel",45.00,750,0,"/img/productos/hp/Penca-Luna-Sibel.jpeg"),
(14,8,"ML","Penca de Tuna","Kaita",45.00,750,0,"/img/productos/hp/Penca-Tuna-Kaita.jpeg"),
(14,8,"ML","Phospho Vitacerebrina H3","A E Zinc",45.00,750,0,"/img/productos/hp/Phospho-Vitacerebrina-H3.jpeg"),
(14,8,"ML","Picafloral","Hervid Natura",45.00,750,0,"/img/productos/hp/Picafloral-Hervid-Natura.jpeg"),
(14,8,"ML","Plants 100 Plus","Natural Plus",45.00,750,0,"/img/productos/hp/Plants-100-Plus.jpeg"),
(14,8,"ML","Polen de Abeja Maya","Oxapampa",45.00,750,0,"/img/productos/hp/Polen-Abeja-Maya-Oxapampa.jpeg"),
(14,8,"ML","Polen Multifloral Mielito","Oxapampa",45.00,750,0,"/img/productos/hp/Polen-Multifloral-Mielito-Oxapampa.jpeg"),
(14,8,"ML","Pomada de ChiriChiri","Ampay",45.00,750,0,"/img/productos/hp/Pomada-de-ChiriChiri.jpeg"),
(14,8,"ML","Pomada de Coca","Ampay",45.00,750,0,"/img/productos/hp/Pomada-Coca.jpeg"),
(14,8,"ML","Premium Tea","Sun Valley",45.00,750,0,"/img/productos/hp/Premium-Tea.jpeg"),
(14,8,"ML","Pro Plus","Sibel",45.00,750,0,"/img/productos/hp/Pro-Plus-Sibel.jpeg"),
(14,8,"ML","Propol Kids","Sibel",45.00,750,0,"/img/productos/hp/Propol-Kids-Sibel.jpeg"),
(14,8,"ML","Propol Plus","Sibel",45.00,750,0,"/img/productos/hp/Propol-Plus-Sibel.jpeg"),
(14,8,"ML","Propoleo","El mundo de las Abejas",45.00,750,0,"/img/productos/hp/Propoleo-Mundo-Abejas.jpeg"),
(14,8,"ML","Prostaplus","Sibel",45.00,750,0,"/img/productos/hp/Prostaplus-Sibel.jpeg"),
(14,8,"ML","Proximol Capsula","Kaita",45.00,750,0,"/img/productos/hp/Proximol-Kaita-Capsula.jpeg"),
(14,8,"ML","Proximol Liquido","Kaita",45.00,750,0,"/img/productos/hp/Proximol-Liquido.jpeg"),
(14,8,"ML","Qianlietong","Milenaria",45.00,750,0,"/img/productos/hp/Qianlietong-Milenaria.jpeg"),
(14,8,"ML","Reconstituyente Cerebral","Herbalmax Peru",45.00,750,0,"/img/productos/hp/Reconstituyente-Cerebral.jpeg"),
(14,8,"ML","Repelente de Insectos","Floresta",45.00,750,0,"/img/productos/hp/Repelente-Insectos-Floresta.jpeg"),
(14,8,"ML","Revitapol","El mundo de las Abejas",45.00,750,0,"/img/productos/hp/Revitapol.jpeg"),
(14,8,"ML","Revive Shampo Anticaida","Kaita",45.00,750,0,"/img/productos/hp/Revive-Shampo-Anticaida-Kaita.jpeg"),
(14,8,"ML","Riño Forte Plus","Sibel",45.00,750,0,"/img/productos/hp/Rino-Forte-Plus-Sibel.jpeg"),
(14,8,"ML","Riñonfort","Sibel",45.00,750,0,"/img/productos/hp/Rinonfort-Sibel-Capsula.jpeg"),
(14,8,"ML","Rixiomax","Kaita",45.00,750,0,"/img/productos/hp/Rixiomax-Kaita.jpeg"),
(14,8,"ML","Rosa Crema Facial","Nevada",45.00,750,0,"/img/productos/hp/Rosa-Crema-Facial.jpeg"),
(14,8,"ML","Rosa Talco Perfumado","Nevada",45.00,750,0,"/img/productos/hp/Rosa-Talco-Perfumado.jpeg"),
(14,8,"ML","R-Zhan Pluss","Natural Pluss",45.00,750,0,"/img/productos/hp/R-Zhan-Pluss.jpeg"),
(14,8,"ML","Sabila","Kaita",45.00,750,0,"/img/productos/hp/Sabila-Kaita.jpeg"),
(14,8,"ML","Sabila Plus","Sibel",45.00,750,0,"/img/productos/hp/Sabila-Plus-Sibel.jpeg"),
(14,8,"ML","Sachainchi Alpiste Linaza Ajonjoli","Nutri Mix",45.00,750,0,"/img/productos/hp/Sachainchi-Alpiste-Linaza-Ajonjoli.jpeg"),
(14,8,"ML","Sal Marina","Nutri Mix",45.00,750,0,"/img/productos/hp/Sal-Marina-Nutri-Mix.jpeg"),
(14,8,"ML","Sal Rosada de Maras","Ecograins",45.00,750,0,"/img/productos/hp/Sal-Rosada-Maras-Ecograins.jpeg"),
(14,8,"ML","Salvado de Trigo","Nutri Mix",45.00,750,0,"/img/productos/hp/Salvado-Trigo-Nutri-Mix.jpeg"),
(14,8,"ML","Salvado de Trigo Tostado","Hoja Verde",45.00,750,0,"/img/productos/hp/Salvado-Trigo-Tostado-Hoja-Verde.jpeg"),
(14,8,"ML","Salvador Triple","Vidax",45.00,750,0,"/img/productos/hp/Salvador-Triple-Vidax.jpeg"),
(14,8,"ML","Sangre de Grado","Kaita",45.00,750,0,"/img/productos/hp/Sangre-Grado-Sibel.jpeg"),
(14,8,"ML","Sangre de Grado","Sibel",45.00,750,0,"/img/productos/hp/Sangre-de-Grado-Kaita.jpeg"),
(14,8,"ML","Sanogal-Y","Jumam",45.00,750,0,"/img/productos/hp/Sanogal-Y-Junam.jpeg"),
(14,8,"ML","Saw Palmetto","Mason Natural",45.00,750,0,"/img/productos/hp/Saw-Palmetto.jpeg"),
(14,8,"ML","Semillas Alpiste","Nutri Mix",45.00,750,0,"/img/productos/hp/Semillas-Alpiste-Nutri-Mix.jpeg"),
(14,8,"ML","Seven Lax Laxante Natural","Natural Pluss",45.00,750,0,"/img/productos/hp/Seven-Lax-Laxante-Natural.jpeg"),
(14,8,"ML","Shampoo Colageno y Miel","Beia",45.00,750,0,"/img/productos/hp/Shampoo-Colageno-Miel-Beia.jpeg"),
(14,8,"ML","Shampoo Herbal Capilarlife","Junam",45.00,750,0,"/img/productos/hp/Shampoo-Herbal-Capilarlife.jpeg"),
(14,8,"ML","Shampoo Ortiga Cheveux","Junam",45.00,750,0,"/img/productos/hp/Shampoo-Ortiga-Cheveux.jpeg"),
(14,8,"ML","Shampoo Placenta","Beia",45.00,750,0,"/img/productos/hp/Shampoo-Placenta-Beia.jpeg"),
(14,8,"ML","Shampoo Romero","Junam",45.00,750,0,"/img/productos/hp/Shampoo-Romero-Junam.jpeg"),
(14,8,"ML","Shampoo Sabila","Beia",45.00,750,0,"/img/productos/hp/Shampoo-Sabila-Beia.jpeg"),
(14,8,"ML","Shampoo Sabila Gel Natural","Junam",45.00,750,0,"/img/productos/hp/Shampoo-Sabila-Gel-Natural.jpeg"),
(14,8,"ML","Shapoo Anticaspa Braco Cinco Hierbas","Junam",45.00,750,0,"/img/productos/hp/Shampoo-Anticaspa-Braco.jpeg"),
(14,8,"ML","Shu Gan Wan (Higado)","Milenaria",45.00,750,0,"/img/productos/hp/Shu-Gan-Wan-Higado.jpeg"),
(14,8,"ML","Slim Max","Kaita",45.00,750,0,"/img/productos/hp/Slim-Max-Capsula-Kaita.jpeg"),
(14,8,"ML","Soya Lecithim","Mason Natural",45.00,750,0,"/img/productos/hp/Soya-Lecithim.jpeg"),
(14,8,"ML","Spirulina","Bio Natura",45.00,750,0,"/img/productos/hp/Spirulina-sibel.jpeg"),
(14,8,"ML","Spirulina","Sibel",45.00,750,0,"/img/productos/hp/Spirulina-Bio-Aurora.jpeg"),
(14,8,"ML","Stress Forte Plus","Sibel",45.00,750,0,"/img/productos/hp/Stress-Forte-Plus.jpeg"),
(14,8,"ML","Te Chino","Te Chino",45.00,750,0,"/img/productos/hp/Te-Chino.jpeg"),
(14,8,"ML","Te Con Hierbas Aromaticas","Guang Jong",45.00,750,0,"/img/productos/hp/Te-hierbas-aromaticas.jpeg"),
(14,8,"ML","Te de Jengibre con Limon Deshidratado","Plan 30 Dias",45.00,750,0,"/img/productos/hp/Te-Jengibre-Limon-Deshidratado.jpeg"),
(14,8,"ML","Te verde","Hierba Santa",45.00,750,0,"/img/productos/hp/Te-Verde-Schagreen-25.jpeg"),
(14,8,"ML","Te verde","Kaita",45.00,750,0,"/img/productos/hp/Te-Verde-Kaita-Capsula.jpeg"),
(14,8,"ML","Te verde","Schagreen",45.00,750,0,"/img/productos/hp/Te-Verde-Schagreen-100.jpeg"),
(14,8,"ML","Te verde","Schagreen",45.00,750,0,"/img/productos/hp/Te-Verde-Hierba-Santa.jpeg"),
(14,8,"ML","Tiger Up","Kaita",45.00,750,0,"/img/productos/hp/Tiger-Up.jpeg"),
(14,8,"ML","Tinte para Cabello Black","Neha",45.00,750,0,"/img/productos/hp/Tinte-Cabello-Black-Neha.jpeg"),
(14,8,"ML","Tinte para Cabello Brown","Color Mate",45.00,750,0,"/img/productos/hp/Tinte-Cabello-Natural-Brown.jpeg"),
(14,8,"ML","Tintura de Valeriana","Laboratio Gerwill",45.00,750,0,"/img/productos/hp/Tintura-Valeriana.jpeg"),
(14,8,"ML","Tocosh","Hervid Natura",45.00,750,0,"/img/productos/hp/Tocosh-Sibel-Liquido.jpeg"),
(14,8,"ML","Tocosh","Kaita",45.00,750,0,"/img/productos/hp/Tocosh-Sibel-Capsula.jpeg"),
(14,8,"ML","Tocosh","Sibel",45.00,750,0,"/img/productos/hp/Tocosh-Hervid-Natura-Capsula.jpeg"),
(14,8,"ML","Tocosh","Sibel",45.00,750,0,"/img/productos/hp/Tocosh-Kaita-Capsula.jpeg"),
(14,8,"ML","Tocosh Penicilina Natural","Sibel",45.00,750,0,"/img/productos/hp/Tocosh-Penicilina-Natural-Sibel.jpeg"),
(14,8,"ML","Troya xxx Desempeño","Nutrisa Life",45.00,750,0,"/img/productos/hp/Troya-xxx.jpeg"),
(14,8,"ML","Troya xxx Gel","Nutrisa Life",45.00,750,0,"/img/productos/hp/Troya-xxx.jpeg"),
(14,8,"ML","Troya xxx Prostata","Nutrisa Life",45.00,750,0,"/img/productos/hp/Troya-xxx.jpeg"),
(14,8,"ML","Tung-Hai Fish Liver Oil","SQSC",45.00,750,0,"/img/productos/hp/Tung-Hai-Fish-Liver-Oil.jpeg"),
(14,8,"ML","Unguento Amazonico Uña de Gato","Hierba Santa",45.00,750,0,"/img/productos/hp/Unguento-Amazonico.jpeg"),
(14,8,"ML","Unguento Antimicosis","Hierba Santa",45.00,750,0,"/img/productos/hp/Unguento-Antimicosis.jpeg"),
(14,8,"ML","Unguento Balsamo Chino","Acuaries",45.00,750,0,"/img/productos/hp/Unguento-Balsamo-Chino.jpeg"),
(14,8,"ML","Unguento Caja","Benzo Derma",45.00,750,0,"/img/productos/hp/Benzo-Derma-Unguento-Caja-24.jpeg"),
(14,8,"ML","Unguento de Coca","Oro Verde",45.00,750,0,"/img/productos/hp/Unguento-Coca-Oro-Verde.jpeg"),
(14,8,"ML","Unguento Glucosa Mine","Oro Verde",45.00,750,0,"/img/productos/hp/Unguento-Glucosa-Mine.jpeg"),
(14,8,"ML","Unguento Molle Arnica Romero","Oro Verde",45.00,750,0,"/img/productos/hp/Unguento-Molle-Arnica-Romero.jpeg"),
(14,8,"ML","Unguento Uña de Gato","Cipronas",45.00,750,0,"/img/productos/hp/Unguento-Una-Gato.jpeg"),
(14,8,"ML","Uña de Gato","Eco Plants",45.00,750,0,"/img/productos/hp/Una-Gato-Sibel.jpeg"),
(14,8,"ML","Uña de Gato","Kaita",45.00,750,0,"/img/productos/hp/Una-de-Gato-kaita.jpeg"),
(14,8,"ML","Uña de Gato","Sibel",45.00,750,0,"/img/productos/hp/Una-Gato-Ecoplants.jpeg"),
(14,8,"ML","Uña de gato con Hoja de Coca","Delisse",45.00,750,0,"/img/productos/hp/Una-Gato-Hoja-Coca.jpeg"),
(14,8,"ML","Uña de Gato con Oja de Coca","Delisse",45.00,750,0,"/img/productos/hp/Una-Gato-Oja-Coca-25.jpeg"),
(14,8,"ML","Uña de Gato Ortiga Romero y Menta","Kaita",45.00,750,0,"/img/productos/hp/Una-Gato-Ortiga-Romero-Menta-Kaita.jpeg"),
(14,8,"ML","Vigorizante Sexual Huang He","Milenaria",45.00,750,0,"/img/productos/hp/Vigorizante-Sexual-Huang-He.jpeg"),
(14,8,"ML","Vinagre de Manzana","Sibel",45.00,750,0,"/img/productos/hp/Vinagre-Manzana-Sibel-1-L.jpeg"),
(14,8,"ML","Vita Celfem Forte","Sibel",45.00,750,0,"/img/productos/hp/Vita-Celfem-Forte.jpeg"),
(14,8,"ML","Vitacerebrina","Royal Center",45.00,750,0,"/img/productos/hp/Vitacerebrina-Royal-center.jpeg"),
(14,8,"ML","Vitasoya","Kaita",45.00,750,0,"/img/productos/hp/Vitasoya.jpeg"),
(14,8,"ML","Warmi","Sibel",45.00,750,0,"/img/productos/hp/Warmi-Sibel.jpeg"),
(14,8,"ML","Wheight Gainer Vainilla","Nutritium",45.00,750,0,"/img/productos/hp/Wheight-Gainer-Vainilla.jpeg"),
(14,8,"ML","Zinc","Mason Natural",45.00,750,0,"/img/productos/hp/Zinc.jpeg");

*/
