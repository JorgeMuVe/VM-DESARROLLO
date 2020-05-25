/*
-- Description:     PAGINA PRINCIPAL DE DIRECCIONES DE CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/*** F U N C I O N E S ***/
import { obtenerUsuario } from '../../Componentes/Funciones';
import { agregarDireccion_DB, editarDireccion_DB, listarDirecciones_DB } from '../../DB/direccionDB';

/* ICONOS */
import IconoAgregar from '../../SVG/aplicacion/IconoAgregar';
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
let map;
var ubicacion;

const estadoInicial = {
    usuarioAplicacion:{},
    direccionesCliente: [],

    mostrarModalAgregar: false,
    direccionSeleccionado: {},
};

export class ClienteDirecciones extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    obtenerDirecciones =()=> {
        const { usuarioAplicacion}  = this.state;
        listarDirecciones_DB(usuarioAplicacion.codigoUsuario).then(lista=>{
            if(!lista.error){ this.setState({direccionesCliente:lista}) }
            else {console.log("ERROR >> LISTAR DIERCCIONES CLIENTE")}
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

    ubicarDireccion =()=> {
        var position = {
            lat: parseFloat(this.state.direccionSeleccionado.lat) || -13.537623654609476,
            lng: parseFloat(this.state.direccionSeleccionado.lng) || -71.90437483693309
        };
        this.mostrarMapa(position);
    }

    guardarDireccion =(evento)=> {
        evento.preventDefault();
        const Direccion = {
            idDireccion:this.state.direccionSeleccionado.idDireccion,
            idCliente:this.props.usuarioAplicacion.codigoUsuario,
            denominacionDireccion:document.getElementById("denominacionDireccion").value,
            referenciaDireccion:document.getElementById("referenciaDireccion").value,
            lat:ubicacion.getPosition().lat(),
            lng:ubicacion.getPosition().lng()
        }
        if(Direccion.idDireccion){
            editarDireccion_DB(Direccion).then(res=>{
                if(!res.error){
                    this.obtenerDirecciones();
                    this.controlModalAgregar();
                } else { console.log("ERROR >> EDITAR DIRECCION");}
            });
        } else {
            agregarDireccion_DB(Direccion).then(res=>{
                if(!res.error){
                    this.obtenerDirecciones();
                    this.controlModalAgregar();
                } else { console.log("ERROR >> AGREGAR DIRECCION");}
            });
        }

    }

    agregarDireccion =()=> {
        this.setState({direccionSeleccionado:{}},()=>{
            this.controlModalAgregar();
            setTimeout(this.obtenerPosicion,100);  
        });
    }

    seleccionarDireccion =(Direccion)=> {
        this.setState({direccionSeleccionado:Direccion},()=>{
            this.controlModalAgregar();
            setTimeout(this.ubicarDireccion,100);
            
        });
    }

    iniciarFunciones =(usuarioAplicacion)=> {
        this.setState({usuarioAplicacion},()=>this.obtenerDirecciones())
    }

    componentDidMount(){
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){
            this.iniciarFunciones(usuarioAplicacion);
        } else{this.props.history.push('/')}
    }

    render(){
        return(
            <div className="ClienteDirecciones">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Direcciones </label>
                    <div onClick={this.agregarDireccion}><IconoAgregar fill="#23A24D"/></div>
                </div>
                {(this.state.direccionesCliente||[1]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>                            
                                <th> DIRECCION </th>
                                <th> REFERENCIA </th>
                            </tr>
                        </thead>
                        {(this.state.direccionesCliente||[1,2,3]).map((direccion,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.seleccionarDireccion(direccion)}>
                                    <td> {direccion.denominacionDireccion} </td>
                                    <td> {direccion.referenciaDireccion} </td>
                                </tr>
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        Paginado
                    </div>
                </div> :
                <div>No Existen Direcciones Registradas</div> }

                <Modal
                    mostrarModal = {this.state.mostrarModalAgregar}
                    controlModal = {this.controlModalAgregar}
                    tituloModal = {"Agregar Direccion"}
                >
                <div className="cliente_agregar_direccion">
                    <fieldset><legend align="left">Dirección</legend>
                        <input type="text" id="denominacionDireccion" placeholder="Ej. Urb. Santa Monica A-45" 
                            defaultValue={this.state.direccionSeleccionado.denominacionDireccion||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Referencia</legend>
                        <textarea rows="6" id="referenciaDireccion" placeholder="Ej. Alfrente de Real Plaza, Casa con Puerta Azul" 
                            defaultValue={this.state.direccionSeleccionado.referenciaDireccion||""}></textarea>
                    </fieldset>
                    <fieldset><legend align="left">Ubicación</legend>
                        <div className="cliente_agregar_direccion_ubicacion" id="map"></div>
                    </fieldset>
                    <div className="centrado">
                        <button onClick={this.guardarDireccion}>Guardar Cambios</button>
                    </div>
                </div>
                </Modal>
            </div>
        )
    }
}

export default ClienteDirecciones;
