/*
-- Description:     PAGINA PRINCIPAL DE PEDIDOS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import { buscarUsuarioNegocio_DB } from '../../DB/usuarioDB';
import { obtenerUsuario } from '../../Componentes/Funciones';

/*** ICONO SVG ***/
import IconoAtras from '../../SVG/aplicacion/IconoAtras';
import IconoUsuario from '../../SVG/IconoUsuario';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:[],
};

export class NegocioPerfil extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerUsuarioNegocio =()=> {
        var { usuarioAplicacion } = this.state
        buscarUsuarioNegocio_DB({codigoUsuario:usuarioAplicacion.codigoUsuario }).then(usuario=>{
            if(!usuario.error){
                this.setState({usuarioAplicacion:usuario});
            }
        })
    }

    inicarFunciones =()=> {
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){
            this.setState({usuarioAplicacion},()=>{
            this.obtenerUsuarioNegocio();
        })}
    }

    componentDidMount(){
        this.inicarFunciones();
    }

    render(){
        return(
            <div className="NegocioPerfil">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Datos </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>

                <div className="centrado">
                    <div className="usuario_datos">

                        <div className="usuario_datos_logo centrado"><img src={this.state.usuarioAplicacion.logo||"/img/clientes/sin_foto.jpg"} alt="Logo Negocio"/></div>
                        
                        <div className="usuario_datos_informacion">
                            <fieldset> <legend align="left">Empresa</legend>
                                <div className="usuario_datos_informacion_negocio">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="nombreNegocio" placeholder="Nombre Empresa" defaultValue={this.state.usuarioAplicacion.nombreNegocio||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="apellidoPaterno" placeholder="RUC" defaultValue={this.state.usuarioAplicacion.ruc||""}/></div>
                                </div>
                            </fieldset>

                            <fieldset> <legend align="left">Datos Negocio</legend>
                                <div className="usuario_datos_informacion_negocio">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="correoNegocio" placeholder="Correo Electronico" defaultValue={this.state.usuarioAplicacion.correoNegocio||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="telefonoNegocio" placeholder="Teléfono" defaultValue={this.state.usuarioAplicacion.telefonoNegocio||""}/></div>
                                </div>
                            </fieldset>
                        </div>
                        
                        <fieldset><legend align="left">Descripción</legend>
                            <textarea rows="6" id="descripcion" placeholder="Ej. Productores de Ropa" defaultValue={this.state.usuarioAplicacion.descripcionNegocio||""}></textarea>
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
