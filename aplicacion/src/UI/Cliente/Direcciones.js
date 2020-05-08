/*
-- Description:     PAGINA PRINCIPAL DE DIRECCIONES DE CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarModalAgregar: false
};

export class ClienteDirecciones extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    render(){
        return(
            <div className="ClienteDirecciones">
                
                <div className="cliene_direcciones_encabezado">
                    <label> DIRECCIONES REGISTRADAS</label>
                    <button onClick={this.controlModalAgregar}> Agregar Direccion </button>
                </div>
                
                {(this.state.direccionesCliente||[]).length > 0?
                <div className="cliente_direcciones_tabla">
                    {(this.state.direccionesCliente||[]).map(direccion =>
                    <div> San Jeronimo N° 457 1</div>)}
                </div> :
                <div> No Existen Direcciones Registradas</div>}
                <Modal
                    mostrarModal = {this.state.mostrarModalAgregar}
                    controlModal = {this.controlModalAgregar}
                    tituloModal = {"Agregar Direccion"}
                >
                <div className="">
                    Modal para Agregar
                </div>
                </Modal>  
            </div>
        )
    }
}

export default ClienteDirecciones;
