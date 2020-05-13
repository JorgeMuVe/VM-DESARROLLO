/*
-- Description:      PIE DE PAGINA DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* ICONOS */
import IconoGoogle from '../SVG/IconoGoogle';

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

                <div className="AtencionCliente">
                    <label>Atencion al Cliente</label>
                    <span><a href="##">Horarios de Atención</a></span>
                    <span><a href="##">Preguntas frecuentes</a></span>
                    <span><a href="##">Cambios y devoluciones</a></span>
                </div>

                <div className="PoliticasCondiciones">
                    <label>Politicas y Condiciones</label>
                    <span><a href="##">Política de datos personales</a></span>
                    <span><a href="##">Condiciones de promociones</a></span>
                    <span><a href="##">Términos y condiciones</a></span>            
                </div>

                <div className="Nosotros">
                    <label>Nosotros</label>
                    <span><a href="##">Conocénos</a></span>
                    <span><a href="##">Trabaja con nosotros</a></span>
                    <span><a href="##">Nuestras tiendas</a></span>
                </div>
                <div className="Comunicate">
                    <label>Comunícate</label>

                    <div className="centrado">
                        <div className="comunicate_item">
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <span>Telefono</span>
                        </div>
                    </div>

                    <div className="centrado">
                        <div className="comunicate_item">
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <span>Ubicacion</span>
                        </div>
                    </div>

                    <div className="centrado">
                        <div className="comunicate_item">
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <span>Correo</span>
                        </div>
                    </div>

                    <label>Siguenos en:</label>
                    <div className="comunicate_redes">
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
        )
    }
}

export default PiePagina;