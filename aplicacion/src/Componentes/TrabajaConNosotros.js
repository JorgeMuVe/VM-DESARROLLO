/*
-- Description:      Trabaja con nosotros DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class TrabajaConNosotros extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => { window.location.href = (this.props.urlAplicacion + ruta) }

    render() {
        return (
            <div className="TrabajaConNosotros">
                <h2 className="texto_temaRojo centrado">Trabaja con Nosotros</h2>
                    <form className="contacto_formularioTN" action="">
                        <div className="contacto_formulario_infoTN">
                            <label htmlFor="nombres">Nombres</label>
                            <input type="text" id="nombres" required></input>
                        </div>
                        <div className="contacto_formulario_infoTN">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" id="apellidos" required></input>
                        </div>
                        <div className="contacto_formulario_infoTN">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required></input>
                        </div>
                        <div className="contacto_formulario_infoTN">
                            <label htmlFor="telefono">Telefono:</label>
                            <input type="text" id="telefono" required></input>
                        </div>
                        <div className="contacto_formulario_infoTN">
                            <label htmlFor="nombreNegocio">Nombre del Negocio:</label>
                            <input type="text" id="nombreNegocio" required></input>
                        </div>
                        <div className="contacto_formulario_infoTN">
                            <label htmlFor="direccionNegocio">Direccion del Negocio</label>
                            <input type="text" id="direccionNegocio" required></input>
                        </div>
                        <div className="contacto_formulario_mensajeTN">
                            <label htmlFor="mensaje">Ingrese su mensaje:</label>
                            <textarea rows="6" id="mensaje" required></textarea>
                        </div>
                        <div className="botonContactoFormularioTN">
                            <button className="boton_contactoTN" type="submit">Enviar</button>
                        </div>
                    </form>
            </div>
        )
    }
}

export default TrabajaConNosotros;