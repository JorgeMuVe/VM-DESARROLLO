/*
-- Description:     PAGINA PRINCIPAL DE PRODUCTOS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarModalAgregar: false
};

export class Productos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    render(){
        return(
            <div className="NegocioProductos">
                <div className="negocio_productos_encabezado">
                    <label> PRODUCTOS PUBLICADOS</label>
                    <button onClick={this.controlModalAgregar}> Agregar Producto </button>
                </div>
                {(this.state.productosNegocio||[]).length > 0?
                <div className="negocio_productos_tabla">
                    <table className="tabla_productos">
                        <thead>
                            <tr>
                                <th> NOMBRE </th>
                                <th> UNIDAD </th>
                                <th> PRECIO<br/>UNIDAD</th>
                                <th> DETALLE</th>
                            </tr>
                        </thead>
                        {(this.state.productosNegocio||[]).map((producto,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr>PRODUCTO {i}</tr> 
                            </tbody>
                        )})}
                    </table>
                </div> :
                <div>No Hay Productos Registrados</div> }

                <Modal
                    mostrarModal = {this.state.mostrarModalAgregar}
                    controlModal = {this.controlModalAgregar}
                    tituloModal = {"Agregar Producto"}
                >
                <div className="">
                    Modal para Agregar
                </div>
                </Modal>   
            </div>
        )
    }
}

export default Productos;
