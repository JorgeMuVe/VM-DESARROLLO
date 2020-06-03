/*
-- Description:     PAGINA PRINCIPAL DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import { buscarUsuarioNegocio_DB } from '../../DB/usuarioDB';
import { editarNegocio_DB } from '../../DB/negocioDB';
import { guardarArchivo_DB } from '../../DB/archivoDB';

import { obtenerUsuario } from '../../Componentes/Funciones';

/*** ICONO SVG ***/
import IconoAtras from '../../SVG/aplicacion/IconoAtras';
import IconoUsuario from '../../SVG/IconoUsuario';
import IconoGoogle from '../../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion: {},
    archivoImagenNuevo: null,
    archivoImagenTempo: null,
};

export class NegocioPerfil extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerUsuarioNegocio =(usuarioAplicacion)=> {
        buscarUsuarioNegocio_DB({codigoUsuario:usuarioAplicacion.codigoUsuario }).then(usuario=>{
            if(!usuario.error){
                this.setState({usuarioAplicacion:usuario,archivoImagenNuevo:null,archivoImagenTempo:usuario.logo||""});
            }
        })
    }

    guardarDatos =()=> {
        const {archivoImagenNuevo,usuarioAplicacion} = this.state;
        const Negocio = {
            idNegocio:usuarioAplicacion.codigoUsuario,
            idTipoNegocio:usuarioAplicacion.idTipoNegocio,
            nombreNegocio: document.getElementById("nombreNegocio").value,
            ruc: document.getElementById("ruc").value,
            correoNegocio: document.getElementById("correoNegocio").value,
            telefonoNegocio: document.getElementById("telefonoNegocio").value,
            descripcionNegocio: document.getElementById("descripcionNegocio").value
        }
        var logoNegocio = "/img/negocios/sin_logo.png";
        if(archivoImagenNuevo){
            guardarArchivo_DB(archivoImagenNuevo,"negocios").then(res=>{
                if(!res.error){ logoNegocio = res.ruta; }
                Negocio["logo"] = logoNegocio;
                editarNegocio_DB(Negocio);
            });
        } else{
            if(usuarioAplicacion.logo){ logoNegocio = usuarioAplicacion.logo;}
            Negocio["logo"] = logoNegocio;
            editarNegocio_DB(Negocio);
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
        if(usuarioAplicacion){
            this.obtenerUsuarioNegocio(usuarioAplicacion);
        }
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
                            <fieldset> <legend align="left">Empresa</legend>
                                <div className="usuario_datos_informacion_tienda">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="nombreNegocio" placeholder="Nombre Empresa" defaultValue={this.state.usuarioAplicacion.nombreNegocio||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="ruc" placeholder="RUC" defaultValue={this.state.usuarioAplicacion.ruc||""}/></div>
                                </div>
                            </fieldset>

                            <fieldset> <legend align="left">Datos Negocio</legend>
                                <div className="usuario_datos_informacion_tienda">
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="correoNegocio" placeholder="Correo Electronico" defaultValue={this.state.usuarioAplicacion.correoNegocio||""}/></div>
                                    <div className="cuadro_texto"><IconoUsuario fill="#d1d3d8"/><input type="text" id="telefonoNegocio" placeholder="Teléfono" defaultValue={this.state.usuarioAplicacion.telefonoNegocio||""}/></div>
                                </div>
                            </fieldset>
                        </div>
                        
                        <fieldset><legend align="left">Descripción</legend>
                            <textarea rows="6" id="descripcionNegocio" placeholder="Descripción de la Empresa" defaultValue={this.state.usuarioAplicacion.descripcionNegocio||""}></textarea>
                        </fieldset>
                        
                        <div className="centrado">
                            <button onClick={this.guardarDatos}> Guardar Cambios </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NegocioPerfil;

/*
DELIMITER $$
CREATE PROCEDURE editarNegocio(
	IN `@idNegocio` INT(10) UNSIGNED,
    IN `@idTipoNegocio` INT(10) UNSIGNED,
    IN `@nombreNegocio` VARCHAR(250),
    IN `@ruc` VARCHAR(11),
    IN `@logo` VARCHAR(250),
    IN `@correoNegocio` VARCHAR(250),
    IN `@telefonoNegocio` VARCHAR(250),
    IN `@descripcionNegocio` VARCHAR(250))
BEGIN

UPDATE negocio SET
idTipoNegocio = `@idTipoNegocio`,
nombreNegocio = `@nombreNegocio`,
ruc = `@ruc`, logo = `@logo`,
correoNegocio = `@correoNegocio`,
telefonoNegocio = `@telefonoNegocio`,
descripcionNegocio = `@descripcionNegocio`
WHERE idNegocio = `@idNegocio`;

END$$
DELIMITER ;
*/
