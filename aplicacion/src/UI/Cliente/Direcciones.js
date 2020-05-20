/*
-- Description:     PAGINA PRINCIPAL DE DIRECCIONES DE CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarModalAgregar: false,
    productoSeleccionado:[],
};

export class ClienteDirecciones extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
        this.obtenerUbicacion = this.obtenerUbicacion.bind(this)
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    obtenerUbicacion =()=> {
        if(navigator.geolocation){
            var options = {
                enableHighAccuracy:true,
                timeout:5000,
                maximumAge:0
            };
            
            function success(pos) {
                var crd = pos.coords;
                console.log("Si tiene");
                console.log('Your current position is:');
                console.log('Latitude : ' + crd.latitude);
                console.log('Longitude: ' + crd.longitude);
                console.log('More or less ' + crd.accuracy + ' meters.');
            };
            
            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            //console.log("Si tiene",navigator.geolocation.getCurrentPosition(success,error));
            //navigator.geolocation.watchPosition(success, error, options);
            //chrome://flags/#unsafely-treat-insecure-origin-as-secure
            navigator.geolocation.getCurrentPosition(success, error, options);

        } else { alert("Geolocation is not Suported by this browser.") }
    }

    obtenerCoordenadas =(position)=> {
        console.log("Coords :", position)
    }

    mostrarError =(error)=> {
        switch(error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.");
              break;
            default: console.log("ERROR DESCONOCIDO", error); break;
          }
    }

    render(){
        return(
            <div className="ClienteDirecciones">
                <div className="usuario_encabezado">
                    <label> DIRECCIONES DE CLIENTE </label>
                    <div className="usuario_encabezado_opciones"><button onClick={this.controlModalAgregar}> Agregar Dirección </button></div>
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
                        {(this.state.direccionesCliente||[1,2,3]).map((producto,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td> San Sebastian Quispiquilla Chico D-26{i} </td>
                                    <td> Al frente del Aeropuerto</td>
                                    <td> - 14.67890  ,  - 75.67873</td>
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
                        <input type="text" id="denominacionDireccion" placeholder="Ej. Urb. Santa Monica A-45" defaultValue={this.state.productoSeleccionado.ruc||""}/>
                    </fieldset>
                    <fieldset><legend align="left">Ubicación</legend>
                        <div className="cliente_agregar_direccion_ubicacion">
                            <button onClick={()=>this.obtenerUbicacion()}>Mi Ubicación</button>
                            <button>Seleccionar</button>
                        </div>
                    </fieldset>
                    <fieldset><legend align="left">Referencia</legend>
                        <textarea rows="6" id="referenciaDireccion" placeholder="Ej. Alfrente de Real Plaza, Casa con Puerta Azul" defaultValue={this.state.productoSeleccionado.descripcion||""}></textarea>
                    </fieldset>
                    <div className="centrado">
                        <button>Guardar Cambios</button>
                    </div>
                </div>
                </Modal>
            </div>
        )
    }
}

export default ClienteDirecciones;
