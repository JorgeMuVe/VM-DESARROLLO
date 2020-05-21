/*
-- Description:     PAGINA PRINCIPAL DE DIRECCIONES DE CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/*** F U N C I O N E S ***/
import { agregarDireccion_DB, editarDireccion_DB, listarDirecciones_DB } from '../../DB/direccionDB';


/* VARIABLES GLOBALES */
let map;
var ubicacion;

const estadoInicial = {

    direccionesCliente: [],

    mostrarModalAgregar: false,
    direccionSeleccionado: {},
};

export class ClienteDirecciones extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
        //this.obtenerPosicion = this.obtenerPosicion.bind(this)
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    obtenerDirecciones =()=> {
        const {usuarioAplicacion} = this.props;
        listarDirecciones_DB(usuarioAplicacion.codigoUsuario).then(lista=>{
            if(!lista.error){ this.setState({direccionesCliente:lista}) }
            else {console.log("ERROR >> LISTAR DIERCCIONES CLIENTE")}
        });
    }

    mostrarMapa =(position)=> {
        console.log(document.getElementById('map'));
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
        if(navigator.geolocation){            
            navigator.geolocation.getCurrentPosition((myPosition)=>{
                var position = {
                    lat: myPosition.coords.latitude || -13.537623654609476,
                    lng: myPosition.coords.longitude|| -71.90437483693309
                }; 
                this.mostrarMapa(position);
                
            },(error) => console.log("ERROR >> ", error));
            //chrome://flags/#unsafely-treat-insecure-origin-as-secure
        } else { alert("Geolocation is not Suported by this browser.") }
    }

    ubicarDireccion =()=> {
        console.log("LAT: ", parseFloat(this.state.direccionSeleccionado.lat) );
        console.log("LNG: ", parseFloat(this.state.direccionSeleccionado.lng) );
        
        //console.log("LNG: ", this.state.direccionSeleccionado.lng );

        var position = {
            lat: parseFloat(this.state.direccionSeleccionado.lat) || -13.537623654609476,
            lng: parseFloat(this.state.direccionSeleccionado.lng) || -71.90437483693309
        };
        console.log(position); 
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
        console.log("Direccion:_ ", Direccion);
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
            this.obtenerPosicion();
        });
    }

    seleccionarDireccion =(Direccion)=> {
        this.setState({direccionSeleccionado:Direccion},()=>{
            this.controlModalAgregar();
            setTimeout(this.ubicarDireccion,100);
            
        });
    }

    componentDidMount(){
        this.obtenerDirecciones();
    }

    render(){
        return(
            <div className="ClienteDirecciones">
                <div className="usuario_encabezado">
                    <label> DIRECCIONES DE CLIENTE </label>
                    <div className="usuario_encabezado_opciones"><button onClick={this.agregarDireccion}> Agregar Dirección </button></div>
                </div>
                {(this.state.direccionesCliente||[1]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>                            
                                <th> DIRECCION </th>
                                <th> REFERENCIA </th>
                                <th> UBICACIÓN </th>
                            </tr>
                        </thead>
                        {(this.state.direccionesCliente||[1,2,3]).map((direccion,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.seleccionarDireccion(direccion)}>
                                    <td> {direccion.denominacionDireccion} </td>
                                    <td> {direccion.referenciaDireccion} </td>
                                    <td> {direccion.lat+" , "+direccion.lng}</td>
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
                    <fieldset><legend align="left">Ubicación</legend>
                        <div className="cliente_agregar_direccion_ubicacion" id="map">
                        </div>
                    </fieldset>
                    <fieldset><legend align="left">Referencia</legend>
                        <textarea rows="6" id="referenciaDireccion" placeholder="Ej. Alfrente de Real Plaza, Casa con Puerta Azul" 
                            defaultValue={this.state.direccionSeleccionado.referenciaDireccion||""}></textarea>
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

/*

<div className="cliente_agregar_direccion_ubicacion">
    <button onClick={()=>this.obtenerPosicion()}>Mi Ubicación</button>
    <button>Seleccionar</button>
</div>

*/
