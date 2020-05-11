/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:[],
};

export class ClientePerfil extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="NegocioPerfil">
                <div className="usuario_encabezado">
                    <label> DATOS CLIENTE </label>
                </div>

                <div className="centrado">
                    <div className="usuario_datos">

                        <div className="usuario_datos_logo centrado"><img src="/img/negocios/lagranja.png" alt="Logo Cliente"/></div>
                        
                        <div className="usuario_datos_informacion">
                            <fieldset><legend align="left">Nombre Cliente</legend>
                                <input type="text" id="nombre" placeholder="Ej. Jorge Muñiz" defaultValue={this.state.usuarioAplicacion.nombre||""}/>
                            </fieldset>
                            <fieldset><legend align="left">DNI</legend>
                                <input type="text" id="dni" placeholder="Ej. 72947621" defaultValue={this.state.usuarioAplicacion.dni||""}/>
                            </fieldset>
                            <fieldset><legend align="left">Correo</legend>
                                <input type="text" id="correo" placeholder="Ejem: jorge@reactivaperu.com" defaultValue={this.state.usuarioAplicacion.correo||""}/>
                            </fieldset>
                            <fieldset><legend align="left">Telefono</legend>
                                <input type="text" id="telefono" placeholder="Ej. 974571746" defaultValue={this.state.usuarioAplicacion.telefono||""}/>
                            </fieldset>
                        </div>
                        
                        <div className="centrado">
                            <button> Guardar Cambios </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientePerfil;
