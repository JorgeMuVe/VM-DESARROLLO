/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* FUNCIONES */
import { buscarUsuarioCliente_DB } from '../../DB/usuarioDB';
import { obtenerUsuario } from '../../Componentes/Funciones';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';
import IconoUsuario from '../../SVG/IconoUsuario';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:[],
};

export class ClientePerfil extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerUsuarioCliente =()=> {
        var { usuarioAplicacion } = this.state
        buscarUsuarioCliente_DB({codigoUsuario:usuarioAplicacion.codigoUsuario}).then(usuario=>{
            if(!usuario.error){
                this.setState({usuarioAplicacion:usuario});
            }
        })
    }

    inicarFunciones =()=> {
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){this.setState({usuarioAplicacion},()=>{
            this.obtenerUsuarioCliente();
        })}
    }

    componentDidMount(){
        this.inicarFunciones();
    }

    render(){
        return(
            <div className="TiendaPerfil">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Datos </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>

                <div className="centrado">
                    <div className="usuario_datos">

                        <div className="usuario_datos_logo centrado"><img src="/img/clientes/sin_foto.jpg" alt="Logo Cliente"/></div>
                        
                        <div className="usuario_datos_informacion">
                            <fieldset> <legend align="left">Nombre Completo</legend>
                                <div className="usuario_datos_informacion_nombre">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="nombreCompleto" placeholder="Nombre Completo" defaultValue={this.state.usuarioAplicacion.nombreCompleto||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="apellidoPaterno" placeholder="Apellido Paterno" defaultValue={this.state.usuarioAplicacion.apellidoPaterno||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="apellidoMaterno" placeholder="Apellido Materno" defaultValue={this.state.usuarioAplicacion.apellidoMaterno||""}/></div>
                                </div>
                            </fieldset>

                            <fieldset> <legend align="left">Datos Cliente</legend>
                                <div className="usuario_datos_informacion_nombre">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="registroNacional" placeholder="DNI/RUC" defaultValue={this.state.usuarioAplicacion.registroNacional||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="nombreUsuario" placeholder="Correo Electronico" defaultValue={this.state.usuarioAplicacion.correoCliente||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="telefonoCliente" placeholder="Teléfono" defaultValue={this.state.usuarioAplicacion.telefonoCliente||""}/></div>
                                </div>
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
