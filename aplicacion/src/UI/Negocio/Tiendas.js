/*
-- Description:     PAGINA PRINCIPAL DE TIENDS DEL NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';
import Paginado from '../../Componentes/Paginado';

/*** F U N C I O N E S ***/
import { obtenerUsuario } from '../../Componentes/Funciones';
import { guardarArchivo_DB } from '../../DB/archivoDB';
import { listarTiendasNegocio_DB, agregarTienda_DB, editarTienda_DB, listarTiposNegocio_DB } from '../../DB/tiendaDB';

/* ICONOS */
import IconoAgregar from '../../SVG/aplicacion/IconoAgregar';
import IconoMenu from '../../SVG/aplicacion/IconoMenu';
import IconoUsuario from '../../SVG/IconoUsuario';
import IconoGoogle from '../../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
let map;
var ubicacion;

const estadoInicial = {

    tiposNegocio:[], // TIPOS DE NEGOCIO

    usuarioAplicacion:{},
    tiendasNegocio: [],

    mostrarModalAgregar: false,
    tiendaSeleccionado: {},
    archivoImagenNuevo: null,
    archivoImagenTempo: null,

    paginaActual:1,
    cantidadPaginas:1,
    tiendasPorPagina:5,
};

export class NegocioTiendas extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    obtenerTiposTienda =()=> {
        listarTiposNegocio_DB().then(res=>{
            if(!res.error){ this.setState({tiposNegocio:res}) }
            else { console.log("ERROR >> LISTAR TIPOS DE NEGOCIO") }
        });
    }

    obtenerTiendasNegocio =()=> {
        const Buscador = {
            codigoUsuario: this.state.usuarioAplicacion.codigoUsuario,
            inicio: (this.state.paginaActual-1)*this.state.tiendasPorPagina,
            cantidad: this.state.tiendasPorPagina
        };
        listarTiendasNegocio_DB(Buscador).then(res=>{
            if(!res.error){
                var cantidadPaginas = (res.cantidadTiendas / this.state.tiendasPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas||1);
                this.setState({cantidadPaginas,tiendasNegocio:res.listaTiendas})
            }
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
            lat: parseFloat(this.state.tiendaSeleccionado.lat) || -13.537623654609476,
            lng: parseFloat(this.state.tiendaSeleccionado.lng) || -71.90437483693309
        };
        this.mostrarMapa(position);
    }

    guardarTienda =(evento)=> {
        evento.preventDefault();
        var tp = document.getElementById('tipoNegocio');
        var tipoNegocio = tp.options[tp.selectedIndex].value;
        
        const { archivoImagenNuevo,tiendaSeleccionado } = this.state;

        const Tienda = {
            idTienda:tiendaSeleccionado.idTienda,
            idNegocio:this.state.usuarioAplicacion.codigoUsuario,
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
                this.guardarDatosTienda(Tienda);
            });
        } else{
            if(tiendaSeleccionado.logo){ logoTienda = tiendaSeleccionado.logo;}
            Tienda["logo"] = logoTienda;
            this.guardarDatosTienda(Tienda);
        }        
    }

    guardarDatosTienda =(Tienda)=> {
        if(Tienda.idTienda){
            editarTienda_DB(Tienda).then(res=>{
                if(!res.error){
                    this.obtenerTiendasNegocio();
                    this.controlModalAgregar();
                } else { console.log("ERROR >> EDITAR TIENDA");}
            });
        } else {
            Tienda["contrasena"] = document.getElementById("contrasena").value;
            agregarTienda_DB(Tienda).then(res=>{
                if(!res.error){
                    this.obtenerTiendasNegocio();
                    this.controlModalAgregar();
                } else { this.props.abrirMensajeError(4000, res.error);}
            });
        }
    }

    cambiarArchivo = (evento) => {
        if(evento.target.files[0]){
            let archivoImagenNuevo = evento.target.files[0];
            this.setState({archivoImagenNuevo,archivoImagenTempo:URL.createObjectURL(archivoImagenNuevo)});
        }        
    }

    agregarTienda =()=> {
        this.setState({tiendaSeleccionado:{},archivoImagenNuevo:null,archivoImagenTempo:null},()=>{
            this.controlModalAgregar();
            setTimeout(this.obtenerPosicion,100);
        });
    }

    seleccionarTienda =(Tienda)=> {
        this.setState({tiendaSeleccionado:Tienda,archivoImagenNuevo:null,archivoImagenTempo:Tienda.logo||""},()=>{
            this.controlModalAgregar();
            setTimeout(this.ubicarTienda,100);
        });
    }
    /****  P A G I N A D O  ****/
    paginaSiguiente =()=> {
        const { paginaActual, cantidadPaginas } = this.state;
        if(paginaActual < cantidadPaginas){
            this.setState({paginaActual:paginaActual+1},()=> {
                this.obtenerTiendasNegocio();
            });
        }
    }

    paginaAtras =()=> {
        const { paginaActual } = this.state;
        if(paginaActual>1){
            this.setState({paginaActual:paginaActual-1},()=> {
                this.obtenerTiendasNegocio();
            });
        }
    }

    iniciarFunciones =(usuarioAplicacion)=> {
        this.setState({usuarioAplicacion},()=>{
            this.obtenerTiposTienda();
            this.obtenerTiendasNegocio();
        })
    }

    componentDidMount(){
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){
            this.iniciarFunciones(usuarioAplicacion);
        } else{this.props.history.push('/')}
    }

    render(){
        return(
            <div className="NegocioTiendas">
                <div className="usuario_encabezado">
                    <div className="usuario_encabezado_menu" onClick={this.props.controlMenuUsuario}><IconoMenu/></div>
                    <label> Mis Tiendas </label>
                    <div onClick={this.agregarTienda}><IconoAgregar fill="#23A24D"/></div>
                </div>
                {(this.state.tiendasNegocio||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>
                                <th> TIENDA </th>
                                <th> CONTACTO </th>
                            </tr>
                        </thead>
                        {(this.state.tiendasNegocio||[]).map((tienda,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.seleccionarTienda(tienda)}>
                                    <td> {tienda.nombreTienda} </td>
                                    <td> {tienda.telefonoTienda}<br/>{tienda.correoTienda} </td>
                                </tr>
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        <Paginado
                            paginaActual={this.state.paginaActual}
                            cantidadPaginas={this.state.cantidadPaginas}
                            paginaSiguiente={this.paginaSiguiente}
                            paginaAtras={this.paginaAtras}
                        />
                    </div>
                </div> :
                <div>No Existen Tiendas Registradas</div> }

                <Modal
                    mostrarModal = {this.state.mostrarModalAgregar}
                    controlModal = {this.controlModalAgregar}
                    tituloModal = {"Agregar Tienda"}
                >
                <form className="negocio_tienda" validate="true" onSubmit={this.guardarTienda}>
                
                    <div className="centrado">
                        <div className="logo_tienda" style={{background:'url('+(this.state.archivoImagenTempo||"/img/tiendas/sin_logo.png")+')no-repeat center/cover'}}>
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
                            <input type="text" id="nombreTienda" placeholder="Nombre Empresa" defaultValue={this.state.tiendaSeleccionado.nombreTienda||""}/>
                        </div>
                        <div className="cuadro_texto">
                            <IconoUsuario fill="#d1d3d8"/>
                            <input type="text" id="descripcionTienda" placeholder="Descripción" defaultValue={this.state.tiendaSeleccionado.descripcionTienda||""}/>
                        </div>
                        <div className="negocio_tienda_datos">
                            <div className="cuadro_texto">
                                <IconoUsuario fill="#d1d3d8"/>
                                <input type="text" id="numeroTienda" placeholder="Numero" defaultValue={this.state.tiendaSeleccionado.numeroTienda||""}/>
                            </div>
                            <div className="cuadro_texto">
                                <IconoUsuario fill="#d1d3d8"/>
                                <select id="tipoNegocio" defaultValue={this.state.tiendaSeleccionado.idTipoNegocio||""}>
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
                            <input type="text" id="telefonoTienda" placeholder="Telefono" defaultValue={this.state.tiendaSeleccionado.telefonoTienda||""}/>
                        </div>
                        <div className="cuadro_texto">
                            <IconoUsuario fill="#d1d3d8"/>
                            <input type="text" id="ruc" placeholder="RUC" defaultValue={this.state.tiendaSeleccionado.ruc||""}/>
                        </div>
                    </div>
                    </fieldset>

                    <fieldset><legend align="left">Cuenta</legend>
                    <div className="negocio_tienda_fieldset">
                        <div className="cuadro_texto">
                            <IconoUsuario fill="#d1d3d8"/>
                            <input type="text" id="correoTienda" placeholder="Correo" 
                            defaultValue={this.state.tiendaSeleccionado.correoTienda||""} readOnly={this.state.tiendaSeleccionado.idTienda?true:false}/>
                        </div>
                        <div className="cuadro_texto">
                            <IconoUsuario fill="#d1d3d8"/>
                            {this.state.tiendaSeleccionado.idTienda?
                            <div>Cambiar Contraseña</div>
                            :
                            <input type="password" id="contrasena" placeholder="Contraseña"/>}
                        </div>
                    </div>
                    </fieldset>

                    <fieldset><legend align="left">Dirección</legend>
                    <div className="negocio_tienda_fieldset">
                        <div className="cuadro_texto">
                            <IconoUsuario fill="#d1d3d8"/>
                            <input type="text" id="direccionTienda" placeholder="Dirección" defaultValue={this.state.tiendaSeleccionado.direccionTienda||""}/>
                        </div>                        
                        <div className="negocio_tienda_ubicacion" id="map"></div>
                    </div>
                    </fieldset>

                    <div className="centrado">
                        <button type="submit">Guardar Cambios</button>
                    </div>

                </form>
                </Modal>
            </div>
        )
    }
}

export default NegocioTiendas;
/*

<img src={this.state.tiendaSeleccionado.logo} alt="Logo Tienda" name="logo" id="logo"/>

<div className="negocio_tienda_imagen">
    {this.state.archivoImagenTempo===null?null:
    <div className="centrado">
        <img src={this.state.archivoImagenTempo} alt="Imagen Producto" name="imagenProducto"/>
    </div>}
    <div className="negocio_tienda_imagen_boton">
        <input type="file" id="logo" accept="image/*" onChange={(e)=> this.cambiarArchivo(e)}/>
        <label htmlFor="imagenProducto"> <IconoGoogle fill="#fefefe"/> Subir Imagen</label>
    </div>
</div>

 */