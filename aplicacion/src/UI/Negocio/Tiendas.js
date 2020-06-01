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
import { listarTiendasNegocio_DB, agregarTienda_DB, editarTienda_DB } from '../../DB/tiendaDB';

/* ICONOS */
import IconoAgregar from '../../SVG/aplicacion/IconoAgregar';
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
let map;
var ubicacion;

const estadoInicial = {
    usuarioAplicacion:{},
    tiendasNegocio: [],

    mostrarModalAgregar: false,
    tiendaSeleccionado: {},

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
        const Tienda = {
            idTienda:this.state.tiendaSeleccionado.idTienda,
            idNegocio:this.state.usuarioAplicacion.codigoUsuario,
            idTipoNegocio: document.getElementById("idTipoNegocio").value,
            numeroTienda: document.getElementById("numeroTienda").value,
            nombreTienda: document.getElementById("nombreTienda").value,
            ruc: document.getElementById("ruc").value,
            logo: document.getElementById("logo").value,
            correoTienda: document.getElementById("correoTienda").value,
            telefonoTienda: document.getElementById("telefonoTienda").value,
            direccionTienda: document.getElementById("direccionTienda").value,
            descripcionTienda: document.getElementById("descripcionTienda").value,
            lat:ubicacion.getPosition().lat(),
            lng:ubicacion.getPosition().lng()
        }
        if(Tienda.idTienda){
            editarTienda_DB(Tienda).then(res=>{
                if(!res.error){
                    this.obtenerTiendas();
                    this.controlModalAgregar();
                } else { console.log("ERROR >> EDITAR TIENDA");}
            });
        } else {
            agregarTienda_DB(Tienda).then(res=>{
                if(!res.error){
                    this.obtenerTiendas();
                    this.controlModalAgregar();
                } else { console.log("ERROR >> AGREGAR TIENDA");}
            });
        }
    }

    agregarTienda =()=> {
        this.setState({tiendaSeleccionado:{}},()=>{
            this.controlModalAgregar();
            setTimeout(this.obtenerPosicion,100);  
        });
    }

    seleccionarTienda =(Tienda)=> {
        this.setState({tiendaSeleccionado:Tienda},()=>{
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
        this.setState({usuarioAplicacion},()=>this.obtenerTiendasNegocio())
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
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Tiendas </label>
                    <div onClick={this.agregarTienda}><IconoAgregar fill="#23A24D"/></div>
                </div>
                {(this.state.tiendasNegocio||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>                            
                                <th> NUMERO </th>
                                <th> TIENDA </th>
                                <th> PROPIETARIO </th>
                                <th> CONTACTO </th>
                            </tr>
                        </thead>
                        {(this.state.tiendasNegocio||[]).map((tienda,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.seleccionarTienda(tienda)}>
                                    <td> {tienda.numeroTienda} </td>
                                    <td> {tienda.nombreTienda} </td>
                                    <td> {tienda.propietario} </td>
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
                <form className="cliente_agregar_direccion" validate="true" onSubmit={this.guardarTienda}>
                    <fieldset><legend align="left">Logo</legend>
                        <input type="text" id="logo" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.tiendaSeleccionado.logo||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Nombre</legend>
                        <input type="text" id="nombreTienda" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.tiendaSeleccionado.nombreTienda||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Numero</legend>
                        <input type="text" id="numeroTienda" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.tiendaSeleccionado.numeroTienda||""}/>
                    </fieldset>
                    <fieldset><legend align="left">RUC</legend>
                        <input type="text" id="ruc" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.tiendaSeleccionado.ruc||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Correo</legend>
                        <input type="text" id="correoTienda" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.tiendaSeleccionado.correoTienda||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Telefono</legend>
                        <input type="text" id="telefonoTienda" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.tiendaSeleccionado.telefonoTienda||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Dirección</legend>
                        <input type="text" id="direccionTienda" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.tiendaSeleccionado.direccionTienda||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Descripcion</legend>
                        <input type="text" id="descripcionTienda" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.tiendaSeleccionado.descripcionTienda||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Ubicación</legend>
                        <div className="cliente_agregar_direccion_ubicacion" id="map"></div>
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
