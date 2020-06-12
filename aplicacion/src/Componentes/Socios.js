/* COMPONENTES */
import React from 'react';
import { withRouter } from 'react-router';

/* VARIABLES GLOBALES */
const estadoInicial = {
    listaNegocios: [
        { idNegocio: 2, producto: '/img/negocios/productos/vinocanchon.jpg', logo: '/img/negocios/logo_vinocanchon.png', nombreTienda: 'Vinocanchon', descripcion: 'Mercado de Mayoristas y Minoristas' },
        { idNegocio: 3, producto: '/img/negocios/productos/wanchaq.jpg', logo: '/img/negocios/logo_wanchaq.jpg', nombreTienda: 'Mercado Wanchaq', descripcion: 'Mercado de Verdura, Carne, Etc.' },
        { idNegocio: 4, producto: '/img/negocios/productos/lagranja.jpg', logo: '/img/negocios/logo_lagranja.png', nombreTienda: 'La Granja', descripcion: 'Parrillas y Pollos' },
        { idNegocio: 5, producto: '/img/negocios/productos/etapoy.jpg', logo: '/img/negocios/logo_etapoy.png', nombreTienda: 'Etapoy', descripcion: 'Pollo a la braza' },
        { idNegocio: 6, producto: '/img/negocios/productos/lacanasta.jpg', logo: '/img/negocios/logo_lacanasta.jpg', nombreTienda: 'La Canasta', descripcion: 'Supermercados La Canasta' },
        { idNegocio: 7, producto: '/img/negocios/productos/orion.jpg', logo: '/img/negocios/logo_orion.jpg', nombreTienda: 'Orion Supermercado', descripcion: 'Supermercados Orion' },
        { idNegocio: 8, producto: '/img/negocios/productos/hampina.jpg', logo: '/img/negocios/logo_hampina.png', nombreTienda: 'Hampina Wassi', descripcion: 'Casa Naturista' },
        { idNegocio: 9, producto: '/img/negocios/productos/carmen.jpg', logo: '/img/negocios/logo_carmen.jpg', nombreTienda: 'CC Carmen', descripcion: 'Centro Comercial Carmen' },
        { idNegocio: 10, producto: '/img/negocios/productos/molino.jpg', logo: '/img/negocios/logo_molino1.png', nombreTienda: 'CC Molino 1', descripcion: 'Centro Comercial Molino' },

    ]
};

export class Socios extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => {
        //this.props.history.push("/productos/buscador/TODO/_"+ruta)
        window.location.href = "/productos/buscador/TODO/_" + ruta;
    }

    render() {
        return (
            <div className="Socios">
                <h2>Nuestros Socios</h2>
                <div className="centrar_lista">
                    <div className="lista_socios">
                        {(this.state.listaNegocios || []).map((negocio, i) =>
                            <div className="lista_socios_item" key={i} onClick={() => { this.redireccionar(negocio.idNegocio) }}>
                                <div className="socio_item_imagen">
                                    <img className="imagenR" alt="Imagen Producto" width="330" height="200" src={negocio.producto}></img>
                                    <figcaption><img alt="Logo Negocio" src={negocio.logo}></img></figcaption>
                                </div>
                                <div className="socio_item_datos">
                                    <h4>{negocio.nombreTienda}</h4>
                                    <h5>{negocio.descripcion}</h5>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(Socios);