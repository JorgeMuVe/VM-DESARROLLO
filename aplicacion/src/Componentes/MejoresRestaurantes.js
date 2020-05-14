/*
-- Description:      MEJORES RESTAURANTES DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {
    listaMejoresRestaurantes:[
        { imgProducto:'/img/productos/topPolloBraza.jpg', imgLogo:'/img/negocios/lagranja.png', nombreTienda:'La Granja', descripcion:'Tipo de comida : Pollos a la braza' },
        { imgProducto:'/img/productos/topPizza.jpg', imgLogo:'/img/negocios/orion.jpg', nombreTienda:'Orion', descripcion:'Tipo de comida : Pollos a la braza' },
        { imgProducto:'/img/productos/topParrilla.jpeg', imgLogo:'/img/negocios/lagranja.png', nombreTienda:'La Granja', descripcion:'Tipo de comida : Pollos a la braza' },
        { imgProducto:'/img/productos/topHamburguesa.jpg', imgLogo:'/img/negocios/lagranja.png', nombreTienda:'La Granja', descripcion:'Tipo de comida : Pollos a la braza' },
        { imgProducto:'/img/productos/topCaldo.jpg', imgLogo:'/img/negocios/lagranja.png', nombreTienda:'La Granja', descripcion:'Tipo de comida : Pollos a la braza' },
        { imgProducto:'/img/productos/topChifa.jpg', imgLogo:'/img/negocios/lagranja.png', nombreTienda:'La Granja', descripcion:'Tipo de comida : Pollos a la braza' },
    ]
};

export class MejoresRestaurantes extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => { window.location.href = (this.props.urlAplicacion + ruta) }

    render() {
        return (
            <div className="MejoresRestaurantes">
                <h2>Mejores Restaurantes</h2>
                <div className="lista_restaurantes">
                    {(this.state.listaMejoresRestaurantes||[]).map(restaurante=>
                        <div className="lista_restaurantes_item">
                            <div className="restaurante_item_imagen">
                                <a href="/"><img className="imagenR" alt="Imagen Producto" width="330" height="200" src={restaurante.imgProducto}></img></a>
                                <figcaption><a href="/"><img alt="Logo Negocio" src={restaurante.imgLogo}></img></a></figcaption>
                            </div>
                            <div className="restaurante_item_datos">
                                <h4>{restaurante.nombreTienda}</h4>
                                <h5>{restaurante.descripcion}</h5>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default MejoresRestaurantes;