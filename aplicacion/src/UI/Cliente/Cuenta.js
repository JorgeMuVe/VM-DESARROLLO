/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* FUNCIONES */
import { guardarArchivo_DB } from '../../DB/archivoDB';
import { editarCliente_DB } from '../../DB/clienteDB';
import { buscarUsuarioCliente_DB } from '../../DB/usuarioDB';
import { obtenerUsuario } from '../../Componentes/Funciones';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';
import IconoUsuario from '../../SVG/IconoUsuario';
import IconoGoogle from '../../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:[],
    archivoImagenNuevo: null,
    archivoImagenTempo: null,
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

    guardarDatos =()=> {
        const {archivoImagenNuevo,usuarioAplicacion} = this.state;
        const Cliente = {
            idCliente:usuarioAplicacion.codigoUsuario,
            registroNacional: document.getElementById("registroNacional").value,
            nombreCompleto: document.getElementById("nombreCompleto").value,
            apellidoPaterno: document.getElementById("apellidoPaterno").value,
            apellidoMaterno: document.getElementById("apellidoMaterno").value,
            telefonoCliente: document.getElementById("telefonoCliente").value
        }
        var imagenCliente = "/img/clientes/sin_foto.png";
        if(archivoImagenNuevo){
            guardarArchivo_DB(archivoImagenNuevo,"clientes").then(res=>{
                if(!res.error){ imagenCliente = res.ruta; }
                Cliente["imagenCliente"] = imagenCliente;
                editarCliente_DB(Cliente).then(res=>{
                    console.log(res);
                });
            });
        } else{
            if(usuarioAplicacion.imagenCliente){ imagenCliente = usuarioAplicacion.imagenCliente;}
            Cliente["imagenCliente"] = imagenCliente;
            editarCliente_DB(Cliente).then(res=>{
                console.log(res);
            });
        }
    }

    cambiarArchivo = (evento) => {
        if(evento.target.files[0]){
            let archivoImagenNuevo = evento.target.files[0];
            this.setState({archivoImagenNuevo,archivoImagenTempo:URL.createObjectURL(archivoImagenNuevo)});
        }        
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

                        <div className="centrado">
                            <div className="logo_tienda" style={{background:'url('+(this.state.archivoImagenTempo||"/img/clientes/sin_foto.jpg")+')no-repeat center/cover'}}>
                                <div className="logo_tienda_opciones">
                                    <input type="file" id="logo" accept="image/*" onChange={(e)=> this.cambiarArchivo(e)}/>
                                    <label htmlFor="logo" title="Cambiar Foto"><IconoGoogle fill="#fefefe"/></label>
                                    <label onClick={()=>{alert("Ver")}} title="Ver Foto"><IconoGoogle fill="#fefefe"/></label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="usuario_datos_informacion">
                            <fieldset> <legend align="left">Nombre Completo</legend>
                                <div className="usuario_datos_informacion_cliente">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="nombreCompleto" placeholder="Nombre Completo" defaultValue={this.state.usuarioAplicacion.nombreCompleto||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="apellidoPaterno" placeholder="Apellido Paterno" defaultValue={this.state.usuarioAplicacion.apellidoPaterno||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="apellidoMaterno" placeholder="Apellido Materno" defaultValue={this.state.usuarioAplicacion.apellidoMaterno||""}/></div>
                                </div>
                            </fieldset>

                            <fieldset> <legend align="left">Datos Cliente</legend>
                                <div className="usuario_datos_informacion_cliente">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="registroNacional" placeholder="DNI/RUC" defaultValue={this.state.usuarioAplicacion.registroNacional||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="nombreUsuario" placeholder="Correo Electronico" defaultValue={this.state.usuarioAplicacion.correoCliente||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="telefonoCliente" placeholder="Teléfono" defaultValue={this.state.usuarioAplicacion.telefonoCliente||""}/></div>
                                </div>
                            </fieldset>

                        </div>
                        
                        <div className="centrado">
                            <button onClick={this.guardarDatos}> Guardar Cambios </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientePerfil;
