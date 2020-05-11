/*
-- Description:     PAGINA PRINCIPAL DE PRODUCTOS DE NEGOCIO
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

export class Productos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    render(){
        return(
            <div className="NegocioProductos">
                <div className="usuario_encabezado">
                    <label> PRODUCTOS PUBLICADOS</label>
                    <div className="usuario_encabezado_opciones"><button onClick={this.controlModalAgregar}> Agregar Producto </button></div>
                </div>
                {(this.state.productosNegocio||[1]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>                            
                                <th> PRODUCTO </th>
                                <th> NOMBRE </th>
                                <th> PRECIO<br/>UNIDAD</th>
                                <th> UNIDAD </th>
                            </tr>
                        </thead>
                        {(this.state.productosNegocio||[1,2,3,4,5,6]).map((producto,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td> Ejemplo </td>
                                    <td> Producto {i}</td>
                                    <td> S/. 10.00 </td>
                                    <td> KG </td>
                                </tr>
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        Paginado
                    </div>
                </div> :
                <div>No Hay Productos Registrados</div> }

                <Modal
                    mostrarModal = {this.state.mostrarModalAgregar}
                    controlModal = {this.controlModalAgregar}
                    tituloModal = {"Agregar Producto"}
                >
                <div className="negocio_agregar_producto">
                    <div className="negocio_agregar_producto_general">
                        <fieldset><legend align="left">Nombre</legend>
                            <input type="text" id="nombreProducto" placeholder="Ej. Zapatilla Nike" defaultValue={this.state.productoSeleccionado.nombre||""}/>
                        </fieldset>
                        <fieldset><legend align="left">Unidad</legend>
                            <select id="tipoUnidad">                            
                                <option>UNI</option>
                                <option>KG</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="negocio_agregar_producto_costo">
                        <fieldset><legend align="left">Precio</legend>
                            <input type="text" id="precioPorUnidad" placeholder="S/. 10.00" defaultValue={this.state.productoSeleccionado.ruc||""}/>
                        </fieldset>
                        <fieldset><legend align="left">cantidad</legend>
                            <input type="text" id="unidadCantidad" placeholder="1 KG" defaultValue={this.state.productoSeleccionado.correo||""}/>
                        </fieldset>
                        <fieldset><legend align="left">Descuento</legend>
                            <input type="text" id="descuentoUnidad" placeholder="Ej. 10%" defaultValue={this.state.productoSeleccionado.telefono||""}/>
                        </fieldset>
                    </div>

                    <fieldset><legend align="left">Detalle</legend>
                        <textarea rows="6" id="detalleProducto" placeholder="Ej. Zapatillas Nike Originales de Excelente Canlidad" defaultValue={this.state.productoSeleccionado.descripcion||""}></textarea>
                    </fieldset>

                    <div className="centrado">
                        <fieldset><legend align="left">Imagen</legend>
                            <input type="file" id="imagenProducto"/>
                        </fieldset>
                    </div>

                    <div className="centrado">
                        <button> Guardar Cambios </button>
                    </div>
                </div>
                </Modal>   
            </div>
        )
    }
}

export default Productos;
