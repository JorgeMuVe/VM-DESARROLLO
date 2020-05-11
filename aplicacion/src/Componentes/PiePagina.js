/*
-- Description:      PIE DE PAGINA DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class PiePagina extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => { window.location.href = (this.props.urlAplicacion + ruta) }

    render() {
        return (
            <div className="PiePagina">
                <div className="Comunicate">
                    <h3>Comunícate con Nosotros</h3>

                    <div className="numeros">
                        <span>Cusco: 084-123456</span>
                    </div>

                    <div className="RedesSociales">
                        <h3>Siguenos en:</h3>
                        <div>
                            <a href="https://www.facebook.com/">
                                <img className="facebook" src="/img/RedesSociales/facebook.png" alt="Icono Facebook"></img>
                            </a>
                            <a href="https://twitter.com/explore">
                                <img className="ig" src="/img/RedesSociales/IG.png" alt="Icono Instagram"></img>
                            </a>
                            <a href="https://www.instagram.com/">
                                <img className="twitter" src="/img/RedesSociales/twitter.png" alt="IconoTwitter"></img>
                            </a>
                            <a href="https://www.whatsapp.com/">
                                <img className="wpp" src="/img/RedesSociales/wpp.png" alt="Icono Whatsapp"></img>
                            </a>
                        </div>

                    </div>
                </div>
                <div className="Nosotros">
                    <h3>Nosotros</h3>
                    <span><a href="##">Conocénos</a></span>
                    <span><a href="##">Club</a></span>
                    <span><a href="##">Trabaja con nosotros</a></span>
                    <span><a href="##">Responsabilidad Social</a></span>
                    <span><a href="##">Nuestras tiendas</a></span>
                    <span><a href="##">Ventas</a></span>
                </div>
                <div className="TeInformamos">
                    <h3>Te Informamos</h3>
                    <span><a href="##">Ubicación</a></span>
                </div>
                <div className="AtencionCliente">
                    <h3>Atencion al Cliente</h3>
                    <span><a href="##">Horarios de Atención</a></span>
                    <span><a href="##">Preguntas frecuentes</a></span>
                    <span><a href="##">Cambios y devoluciones</a></span>
                </div>
                <div className="PoliticasCondiciones">
                    <h3>Politicas y Condiciones</h3>
                    <span><a href="##">Política de datos personales</a></span>
                    <span><a href="##">Condiciones de promociones</a></span>
                    <span><a href="##">Términos y condiciones</a></span>
                    <img className="logo" src="/img/negocios/vinocanchonvirtual.png" alt="Logo vinocanchon virtual"></img>
                </div>

            </div>
        )
    }
}

export default PiePagina;