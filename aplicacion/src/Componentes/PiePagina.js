/*
-- Description:      PIE DE PAGINA DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* ICONOS */
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
                    <label className="texto_temaRojo">Atencion al Cliente</label>
                    <span><a href="/HorarioAtencion">Horarios de Atención</a></span>
                    <span><a href="#contacto">Pregunta frecuentes</a></span>
                    <span><a href="/HorarioAtencion/#cambiosDev">Cambios y devoluciones</a></span>
                </div>

                <div className="PoliticasCondiciones">
                    <label className="texto_temaRojo">Politicas y Condiciones</label>
                    <span><a href="/PoliticaDatos">Política de datos personales</a></span>
                    <span><a href="/CondicionesPromociones">Condiciones de promociones</a></span>
                    <span><a href="/TerminosCondiciones">Términos y condiciones</a></span>
                </div>

                <div className="Nosotros">
                    <label className="texto_temaRojo">Nosotros</label>
                    <span><a href="/Conocenos">Conocénos</a></span>
                    <span><a href="/TrabajaConNosotros">Trabaja con nosotros</a></span>
                    <span><a href="##">Nuestras tiendas</a></span>
                </div>
                <div className="Comunicate">
                    <label className="texto_temaRojo">Comunícate</label>
                    <div className="comunitate_cuadro">
                        <div className="comunicate_cuadro_icono">
                            <div className="centrado"> <IconoTelContact fill="#fff"/></div>
                            <div className="centrado"> <IconoUbiContact fill="#fff"/></div>
                            <div className="centrado"> <IconoCorreoContact fill="#fff"/></div>
                        </div>
                        <div className="comunicate_cuadro_datos">
                            <span>974790112 / +5184 654651</span>
                            <span>San Jerónimo Cusco<br/>Calle Rodríguez Pastor 173</span>
                            <span>info@reactiva-peru.com</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PiePagina;

/*

import IconoFacebookContact from '../SVG/IconoFacebookContact';
import IconoIgContact from '../SVG/IconoIgContact';
import IconotwitterContact from '../SVG/IconotwitterContact';
import IconoWppContact from '../SVG/IconoWppContact';


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

*/