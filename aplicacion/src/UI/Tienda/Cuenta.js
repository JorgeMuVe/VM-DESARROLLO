/*
-- Description:     PAGINA PRINCIPAL DE TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import { buscarUsuarioTienda_DB } from '../../DB/usuarioDB';
import { obtenerUsuario } from '../../Componentes/Funciones';

/*** ICONO SVG ***/
import IconoAtras from '../../SVG/aplicacion/IconoAtras';
import IconoUsuario from '../../SVG/IconoUsuario';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:[],
};

export class TiendaPerfil extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerUsuarioTienda =()=> {
        var { usuarioAplicacion } = this.state
        buscarUsuarioTienda_DB({codigoUsuario:usuarioAplicacion.codigoUsuario }).then(usuario=>{
            if(!usuario.error){
                this.setState({usuarioAplicacion:usuario});
            }
        })
    }

    inicarFunciones =()=> {
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){
            this.setState({usuarioAplicacion},()=>{
            this.obtenerUsuarioTienda();
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

                        <div className="usuario_datos_logo centrado"><img src={this.state.usuarioAplicacion.logo||"/img/clientes/sin_foto.jpg"} alt="Logo Tienda"/></div>
                        
                        <div className="usuario_datos_informacion">
                            <fieldset> <legend align="left">Empresa</legend>
                                <div className="usuario_datos_informacion_tienda">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="nombreTienda" placeholder="Nombre Empresa" defaultValue={this.state.usuarioAplicacion.nombreTienda||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="ruc" placeholder="RUC" defaultValue={this.state.usuarioAplicacion.ruc||""}/></div>
                                </div>
                            </fieldset>

                            <fieldset> <legend align="left">Datos Tienda</legend>
                                <div className="usuario_datos_informacion_tienda">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="correoTienda" placeholder="Correo Electronico" defaultValue={this.state.usuarioAplicacion.correoTienda||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="telefonoTienda" placeholder="Teléfono" defaultValue={this.state.usuarioAplicacion.telefonoTienda||""}/></div>
                                </div>
                            </fieldset>
                        </div>
                        
                        <fieldset><legend align="left">Descripción</legend>
                            <textarea rows="6" id="descripcion" placeholder="Ej. Productores de Ropa" defaultValue={this.state.usuarioAplicacion.descripcionTienda||""}></textarea>
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

export default TiendaPerfil;
