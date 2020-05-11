/*
-- Description:      MEJORES RESTAURANTES DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

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
                <div className="TopRest">
                    <div className="tops">
                        <div className="topImagen">
                            <a href="/"><img width="359" height="212" src="/img/productos/topPolloBraza.jpg" alt=""></img></a>
                            <figcaption><a href="/"><img src="/img/negocios/lagranja.png" alt=""></img></a></figcaption>
                        </div>
                        <div className="topTexto">
                            <h4>La Granja</h4>
                            <h5>Tipo de comida : Pollos a la braza</h5>
                            <div>icono</div>
                        </div>
                    </div>
                    <div className="tops">
                    <div className="topImagen">
                            <a href="/"><img width="359" height="212" src="/img/productos/topPizza.jpg" alt=""></img></a>
                            <figcaption><a href="/"><img src="/img/negocios/orion.jpg" alt=""></img></a></figcaption>
                        </div>
                        <div className="topTexto">
                            <h4>La Granja</h4>
                            <h5>Tipo de comida : Pollos a la braza</h5>
                            <div>icono</div>
                        </div>
                    </div>
                    <div className="tops">
                    <div className="topImagen">
                            <a href="/"><img width="359" height="212" src="/img/productos/topParrilla.jpeg" alt=""></img></a>
                            <figcaption><a href="/"><img src="/img/negocios/lagranja.png" alt=""></img></a></figcaption>
                        </div>
                        <div className="topTexto">
                            <h4>La Granja</h4>
                            <h5>Tipo de comida : Pollos a la braza</h5>
                            <div>icono</div>
                        </div>
                    </div>
                    <div className="tops">
                    <div className="topImagen">
                            <a href="/"><img width="359" height="212" src="/img/productos/topHamburguesa.jpg" alt=""></img></a>
                            <figcaption><a href="/"><img src="/img/negocios/lagranja.png" alt=""></img></a></figcaption>
                        </div>
                        <div className="topTexto">
                            <h4>La Granja</h4>
                            <h5>Tipo de comida : Pollos a la braza</h5>
                            <div>icono</div>
                        </div>
                    </div>
                    <div className="tops">
                    <div className="topImagen">
                            <a href="/"><img width="359" height="212" src="/img/productos/topCaldo.jpg" alt=""></img></a>
                            <figcaption><a href="/"><img src="/img/negocios/lagranja.png" alt=""></img></a></figcaption>
                        </div>
                        <div className="topTexto">
                            <h4>La Granja</h4>
                            <h5>Tipo de comida : Pollos a la braza</h5>
                            <div>icono</div>
                        </div>
                    </div>
                    <div className="tops">
                    <div className="topImagen">
                            <a href="/"><img width="359" height="212" src="/img/productos/topChifa.jpg" alt=""></img></a>
                            <figcaption><a href="/"><img src="/img/negocios/lagranja.png" alt=""></img></a></figcaption>
                        </div>
                        <div className="topTexto">
                            <h4>La Granja</h4>
                            <h5>Tipo de comida : Pollos a la braza</h5>
                            <div>icono</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MejoresRestaurantes;