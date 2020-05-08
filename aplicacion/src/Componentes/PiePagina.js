/*
-- Description:      MENU DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Menu extends React.Component {
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
                <div className="Nosotros">
                    <h3>Nosotros</h3>
                </div>
                <div className="TeInformamos">

                </div>
                <div className="AtencionCliente">

                </div>
                <div className="PoliticasCondiciones">

                </div>

            </div>
        )
    }
}

export default Menu;