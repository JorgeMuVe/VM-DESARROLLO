/*
-- Description:      PIE DE PAGINA DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* ICONOS */
import IconoFacebookContact from '../SVG/IconoFacebookContact';
import IconoIgContact from '../SVG/IconoIgContact';
import IconotwitterContact from '../SVG/IconotwitterContact';
import IconoWppContact from '../SVG/IconoWppContact';
import IconoTelContact from '../SVG/IconoTelContact'; 
import IconoUbiContact from '../SVG/IconoUbiContact';
import IconoCorreoContact from '../SVG/IconoCorreoContact';

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
                    <span><a href="##">Horarios de Atención</a></span>
                    <span><a href="##">Cambios y devoluciones</a></span>
                    <div></div><div></div>
                </div>

                <div className="PoliticasCondiciones">
                    <label>Politicas y Condiciones</label>
                    <span><a href="##">Política de datos personales</a></span>
                    <span><a href="##">Condiciones de promociones</a></span>
                    <span><a href="##">Términos y condiciones</a></span>
                    <div></div><div></div>   
                </div>

                <div className="Nosotros">
                    <label>Nosotros</label>
                    <span><a href="##">Conocénos</a></span>
                    <span><a href="##">Trabaja con nosotros</a></span>
                    <span><a href="##">Nuestras tiendas</a></span>
                    <div></div><div></div>
                </div>
                <div className="Comunicate">
                    <label>Comunícate</label>

                    <div className="centrado">
                        <div className="comunicate_item">
                        <div className="centrado"> <IconoTelContact fill="#fff"/></div>
                            <span>982489370 / 974790112</span>
                        </div>
                    </div>

                    <div className="centrado">
                        <div className="comunicate_item">
                            <div className="centrado"> <IconoUbiContact fill="#fff"/></div>
                            <span>Calle Rodríguez Pastor 173 San Jerónimo Cusco</span>
                        </div>
                    </div>

                    <div className="centrado">
                        <div className="comunicate_item">
                            <div className="centrado"> <IconoCorreoContact fill="#fff"/></div>
                            <span>Gerenciageneral@worldconnectperu.com</span>
                        </div>
                    </div>

                    <label>Siguenos en:</label>
                    <div className="comunicate_redes">
                        <a href="https://www.facebook.com/">
                            <div className="centrado"> <IconoFacebookContact fill="#4267b2"/> </div>
                        </a>
                        <a className="ig" href="https://twitter.com/explore">
                            <div className="centrado"> <IconoIgContact/> </div>
                        </a>
                        <a className="tw" href="https://www.instagram.com/">
                            <div className="centrado"> <IconotwitterContact fill="#1da1f2"/> </div>
                        </a>
                        <a href="https://www.whatsapp.com/">
                        <div className="centrado"> <IconoWppContact fill="#06d755"/> </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default PiePagina;