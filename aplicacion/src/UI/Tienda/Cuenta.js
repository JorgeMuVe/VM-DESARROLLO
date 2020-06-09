/*
-- Description:     PAGINA PRINCIPAL DE TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import { guardarArchivo_DB } from '../../DB/archivoDB';
import { buscarUsuarioTienda_DB } from '../../DB/usuarioDB';
import { editarTienda_DB,listarTiposNegocio_DB } from '../../DB/tiendaDB';
import { obtenerUsuario } from '../../Componentes/Funciones';

/*** ICONO SVG ***/
import IconoAtras from '../../SVG/aplicacion/IconoAtras';
import IconoUsuario from '../../SVG/IconoUsuario';
import IconoGoogle from '../../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
let map;
var ubicacion;
const estadoInicial = {
    usuarioAplicacion:{},
    archivoImagenNuevo: null,
    archivoImagenTempo: null,

    tiposNegocio:[], // TIPOS DE NEGOCIO
};

export class TiendaPerfil extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerUsuarioTienda =(usuarioAplicacion)=> {
        buscarUsuarioTienda_DB({codigoUsuario:usuarioAplicacion.codigoUsuario }).then(usuario=>{
            if(!usuario.error){
                this.setState({usuarioAplicacion:usuario,archivoImagenNuevo:null,archivoImagenTempo:usuario.logo||""},()=>{
                    setTimeout(this.ubicarTienda,100);
                });
            }
        })
    }

    obtenerTiposTienda =()=> {
        listarTiposNegocio_DB().then(res=>{
            if(!res.error){ this.setState({tiposNegocio:res}) }
            else { console.log("ERROR >> LISTAR TIPOS DE NEGOCIO") }
        });
    }

    mostrarMapa =(position)=> {
        map = new window.google.maps.Map(document.getElementById('map'),{
            center: new window.google.maps.LatLng(position.lat,position.lng),
            zoom: 14, mapTypeId: 'roadmap'
        });
        window.google.maps.event.addListener(map,'click',function(evento){
            ubicacion.setPosition(evento.latLng);
        });

        ubicacion = new window.google.maps.Marker({position,map,draggable:true});
        window.google.maps.event.addListener(ubicacion,'dragend',function(){
            console.log("DRAGGABLE:_",ubicacion.getPosition().lat());
            console.log("DRAGGABLE:_",ubicacion.getPosition().lng());
        });
    }

    obtenerPosicion =()=> {
        var position = { lat: -13.537623654609476, lng: -71.90437483693309 };  
        if(navigator.geolocation){    
            navigator.geolocation.getCurrentPosition((myPosition)=>{
                position = {
                    lat: myPosition.coords.latitude,
                    lng: myPosition.coords.longitude
                };
                this.mostrarMapa(position);
            },(error) => { console.log("ERROR >> ",error); this.mostrarMapa(position); })
            //chrome://flags/#unsafely-treat-insecure-origin-as-secure
        } else { alert("Geolocation is not Suported by this browser."); this.mostrarMapa(position); }
    }

    ubicarTienda =()=> {
        var position = {
            lat: parseFloat(this.state.usuarioAplicacion.lat) || -13.537623654609476,
            lng: parseFloat(this.state.usuarioAplicacion.lng) || -71.90437483693309
        };
        this.mostrarMapa(position);
    }

    guardarDatos =(evento)=> {
        evento.preventDefault();
        var tp = document.getElementById('tipoNegocio');
        var tipoNegocio = tp.options[tp.selectedIndex].value;

        const {archivoImagenNuevo,usuarioAplicacion} = this.state;

        const Tienda = {
            idTienda:usuarioAplicacion.codigoUsuario,
            idNegocio:usuarioAplicacion.idNegocio,
            idTipoNegocio: tipoNegocio,
            numeroTienda: document.getElementById("numeroTienda").value,
            nombreTienda: document.getElementById("nombreTienda").value,
            ruc: document.getElementById("ruc").value,
            correoTienda: document.getElementById("correoTienda").value,
            telefonoTienda: document.getElementById("telefonoTienda").value,
            direccionTienda: document.getElementById("direccionTienda").value,
            descripcionTienda: document.getElementById("descripcionTienda").value,
            lat:ubicacion.getPosition().lat(),
            lng:ubicacion.getPosition().lng()
        }

        var logoTienda = "/img/tiendas/sin_logo.png";
        if(archivoImagenNuevo){
            guardarArchivo_DB(archivoImagenNuevo,"tiendas").then(res=>{
                if(!res.error){ logoTienda = res.ruta; }
                Tienda["logo"] = logoTienda;
                editarTienda_DB(Tienda)
            });
        } else{
            if(usuarioAplicacion.logo){ logoTienda = usuarioAplicacion.logo;}
            Tienda["logo"] = logoTienda;
            editarTienda_DB(Tienda)
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
            this.obtenerTiposTienda();
            this.obtenerUsuarioTienda(usuarioAplicacion);
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

                        <fieldset><legend align="left">Tienda</legend>
                        <div className="negocio_tienda_fieldset">
                            <div className="cuadro_texto">
                                <IconoUsuario fill="#d1d3d8"/>
                                <input type="text" id="nombreTienda" placeholder="Nombre Empresa" defaultValue={this.state.usuarioAplicacion.nombreTienda||""}/>
                            </div>
                            <div className="cuadro_texto">
                                <IconoUsuario fill="#d1d3d8"/>
                                <input type="text" id="descripcionTienda" placeholder="Descripción" defaultValue={this.state.usuarioAplicacion.descripcionTienda||""}/>
                            </div>
                            <div className="negocio_tienda_datos">
                                <div className="cuadro_texto">
                                    <IconoUsuario fill="#d1d3d8"/>
                                    <input type="text" id="numeroTienda" placeholder="Numero" defaultValue={this.state.usuarioAplicacion.numeroTienda||""}/>
                                </div>
                                <div className="cuadro_texto">
                                    <IconoUsuario fill="#d1d3d8"/>
                                    <select id="tipoNegocio" defaultValue={this.state.usuarioAplicacion.idTipoNegocio||""}>
                                        {(this.state.tiposNegocio||[]).map(tipo=>
                                            <option key={tipo.idTipoNegocio} value={tipo.idTipoNegocio}>{tipo.nombreTipoNegocio}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        </fieldset>

                        <fieldset><legend align="left">Datos</legend>
                        <div className="negocio_tienda_fieldset">
                            <div className="cuadro_texto">
                                <IconoUsuario fill="#d1d3d8"/>
                                <input type="text" id="correoTienda" placeholder="Correo" defaultValue={this.state.usuarioAplicacion.correoTienda||""}/>
                            </div>
                            <div className="cuadro_texto">
                                <IconoUsuario fill="#d1d3d8"/>
                                <input type="text" id="telefonoTienda" placeholder="Telefono" defaultValue={this.state.usuarioAplicacion.telefonoTienda||""}/>
                            </div>
                            <div className="cuadro_texto">
                                <IconoUsuario fill="#d1d3d8"/>
                                <input type="text" id="ruc" placeholder="RUC" defaultValue={this.state.usuarioAplicacion.ruc||""}/>
                            </div>
                        </div>
                        </fieldset>

                        <fieldset><legend align="left">Dirección</legend>
                        <div className="negocio_tienda_fieldset">
                            <div className="cuadro_texto">
                                <IconoUsuario fill="#d1d3d8"/>
                                <input type="text" id="direccionTienda" placeholder="Dirección" defaultValue={this.state.usuarioAplicacion.direccionTienda||""}/>
                            </div>                        
                            <div className="negocio_tienda_ubicacion" id="map"></div>
                        </div>
                        </fieldset>
                        <div className="centrado">
                            <div className="cliente_agregar_boton">
                                <button onClick={this.guardarDatos} >Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TiendaPerfil;
