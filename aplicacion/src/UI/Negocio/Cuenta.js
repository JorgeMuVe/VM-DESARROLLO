/*
-- Description:     PAGINA PRINCIPAL DE PEDIDOS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:[],
};

export class NegocioPerfil extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="NegocioPerfil">
                <div className="usuario_encabezado">
                    <label> DATOS TIENDA </label>
                </div>

                <div className="centrado">
                    <div className="usuario_datos">

                        <div className="usuario_datos_logo centrado"><img src="/img/negocios/orion.jpg" alt="Logo Negocio"/></div>
                        
                        <div className="usuario_datos_informacion">
                            <fieldset><legend align="left">Nombre Tienda</legend>
                                <input type="text" id="nombre" placeholder="Ej. Tienda Nueva L-101" defaultValue={this.state.usuarioAplicacion.nombre||""}/>
                            </fieldset>
                            <fieldset><legend align="left">RUC</legend>
                                <input type="text" id="ruc" placeholder="Ej. 10452345893" defaultValue={this.state.usuarioAplicacion.ruc||""}/>
                            </fieldset>
                            <fieldset><legend align="left">Correo</legend>
                                <input type="text" id="correo" placeholder="Ejem: (N-101) Tienda Nueva" defaultValue={this.state.usuarioAplicacion.correo||""}/>
                            </fieldset>
                            <fieldset><legend align="left">Telefono</legend>
                                <input type="text" id="telefono" placeholder="Ej. tieda@nueva.com" defaultValue={this.state.usuarioAplicacion.telefono||""}/>
                            </fieldset>
                            <fieldset><legend align="left">Dirección</legend>
                                <input type="text" id="direccion" placeholder="Ej. San Jeronimo" defaultValue={this.state.usuarioAplicacion.direccion||""}/>
                            </fieldset>
                            <fieldset><legend align="left">Ubicación</legend>
                                <input type="text" id="direccion" placeholder="Ej. San Jeronimo" defaultValue={this.state.usuarioAplicacion.direccion||""}/>
                            </fieldset>
                        </div>
                        
                        <fieldset><legend align="left">Descripción</legend>
                            <textarea rows="6" id="descripcion" placeholder="Ej. Productores de Ropa" defaultValue={this.state.usuarioAplicacion.descripcion||""}></textarea>
                        </fieldset>
                        
                        <div className="centrado">
                            <button> Guardar Cambios </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NegocioPerfil;
