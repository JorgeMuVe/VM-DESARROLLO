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
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    obtenerUbicacion =()=> {
        if(navigator.geolocation){
            console.log("Si tiene");
            //navigator.geolocation.getCurrentPosition(function(){console.log("Coords :", position.coords)});
        } else { alert("Geolocation is not Suported byt his browser.") }
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
