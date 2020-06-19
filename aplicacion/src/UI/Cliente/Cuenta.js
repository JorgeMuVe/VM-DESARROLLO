/* COMPONENTES */
import React from 'react';
import Imagen from '../../Componentes/Imagen';

/* FUNCIONES */
import { guardarArchivo_DB } from '../../DB/archivoDB';
import { editarCliente_DB } from '../../DB/clienteDB';
import { buscarUsuarioCliente_DB } from '../../DB/usuarioDB';
import { obtenerUsuario } from '../../Componentes/Funciones';

/* ICONOS */
import IconoMenu from '../../SVG/aplicacion/IconoMenu';
import IconoUsuario from '../../SVG/IconoUsuario';


/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrar:false,
    usuarioAplicacion:[],
    nuevaImagen:false,
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
                this.setState({usuarioAplicacion:usuario,archivoImagenNuevo:null,archivoImagenTempo:usuario.imagenCliente||"",mostrar:true});
            }
        })
    }

    guardarDatos =()=> {

        const {archivoImagenNuevo,usuarioAplicacion,nuevaImagen} = this.state;
        if(nuevaImagen&&archivoImagenNuevo===null){ alert("Guarde los cambios de la imagen") }
        else { 
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
                var nombreImagen = Cliente.registroNacional+"."+archivoImagenNuevo.type.split("/")[1];
                var archivoImagen = new File([archivoImagenNuevo], nombreImagen, {type:"image/png", lastModified:new Date()})
                guardarArchivo_DB(archivoImagen,"clientes").then(res=>{
                    if(!res.error){ imagenCliente = res.ruta; }
                    Cliente["imagenCliente"] = imagenCliente;
                    editarCliente_DB(Cliente).then(res=>{                    
                        if(!res.error){ /*this.props.history.push("/usuario/cliente/cuenta")*/window.location.href="/usuario/cliente/cuenta" }
                        else { alert("ERROR >> ",res.error ) }
                    });
                });
            } else{
                if(usuarioAplicacion.imagenCliente){ imagenCliente = usuarioAplicacion.imagenCliente;}
                Cliente["imagenCliente"] = imagenCliente;
                editarCliente_DB(Cliente).then(res=>{
                    if(!res.error){ this.props.history.push("/usuario/cliente/cuenta") }
                    else { alert("ERROR >> ",res.error ) }
                });
            }
        }
    }

    cambiarArchivo = (evento) => {
        if(evento.target.files[0]){
            let archivoImagenNuevo = evento.target.files[0];
            this.setState({archivoImagenNuevo,archivoImagenTempo:URL.createObjectURL(archivoImagenNuevo)});
        }        
    }

    guardarCambiosImagen =(imagen)=> {
        this.setState({archivoImagenNuevo:imagen,archivoImagenTempo:URL.createObjectURL(imagen),nuevaImagen:false})
    }

    controlNuevaImagen =(nuevaImagen)=> this.setState({nuevaImagen})

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
        if(this.state.mostrar){
            return(
                <div className="TiendaPerfil">
                    <div className="usuario_encabezado">
                        <div className="usuario_encabezado_menu" onClick={this.props.controlMenuUsuario}><IconoMenu/></div>
                        <label> Mis Datos </label>
                        <div onClick={this.props.history.goBack}></div>
                    </div>
                    <div className="centrado">
                        <div className="usuario_datos">
                            <Imagen nuevaImagen={this.state.nuevaImagen} 
                                controlNuevaImagen={this.controlNuevaImagen} 
                                guardarImagen={this.guardarCambiosImagen}
                                archivoImagen={this.state.archivoImagenTempo}
                            ></Imagen>
    
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
                                <div className="cliente_agregar_boton">
                                    <button onClick={this.guardarDatos}>Guardar Cambios</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else {return null}
    }
}

export default ClientePerfil;