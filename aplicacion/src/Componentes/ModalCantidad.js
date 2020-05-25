/****** COMPONENTES ******/
import React from 'react';
import Modal from './Modal';

/* FUNCIONES */
import { unidadMedidaProducto } from '../Componentes/Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class ModalCantidad extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    calcularPrecioProducto =(producto)=> {
        var cantidadProducto = parseFloat(producto.unidadCantidad);
        var precioProducto = parseFloat(producto.precioPorUnidad);
        var descuentoUnidad = producto.descuentoUnidad/100;
        return <div>S/. {
            //parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0).toFixed(2)+" x "+
            parseFloat(precioProducto||0).toFixed(2)+" x "+
            unidadMedidaProducto(cantidadProducto,producto.tipoUnidad)+
            (descuentoUnidad>0?(" (-"+producto.descuentoUnidad+"%)"):"")
        }</div>
    }

    calcularPrecioTotalProducto =(producto)=> {
        var precioProducto = parseFloat(producto.precioPorUnidad) * parseFloat(producto.cantidadProducto);
        var descuentoUnidad = parseFloat(producto.descuentoUnidad);
        return <div>
            <b>Pagar: S/. {parseFloat(precioProducto-(precioProducto*(descuentoUnidad/100))||0).toFixed(2)+" (-"+(producto.descuentoUnidad)+"%)"}</b><br/>
            Precio: S/. {parseFloat(precioProducto||0).toFixed(2)}
        </div>
    }


    render(){
        if(this.props.mostrarModalCantidad){
        const {productoSeleccionado} = this.props;
        return(
            <Modal
                controlModal={this.props.controlModalCantidad}
                mostrarModal={this.props.mostrarModalCantidad}
                tituloModal="Cantidad de Producto"
            >
            <div className="ModalCantidad">
                <div className="centrado">

                <img src={productoSeleccionado.imagenProducto} alt="Imagen Producto"></img>
                </div>
                <div> 
                    <b>{productoSeleccionado.nombreProducto}</b><br/>
                    {productoSeleccionado.detalleProducto}
                </div>
                <div> {this.calcularPrecioProducto(productoSeleccionado)} </div>

                <div className="modal_cantidad_agregar">
                    <button onClick={()=>this.props.cambiarCantidadProducto(false)}>-</button>
                        <b>{productoSeleccionado.cantidadProducto||"0.00"}</b>
                    <button onClick={()=>this.props.cambiarCantidadProducto(true)}>+</button>
                </div>
                
                <div className="modal_cantidad_precio">
                    {this.calcularPrecioTotalProducto(productoSeleccionado)}
                </div>

                <div className="modal_cantidad_guardar">
                    <button onClick={this.props.agregarCantidadProducto}> GUARDAR </button>
                </div>
            </div>
            </Modal>
        ) } else { return null }
    }
}

export default ModalCantidad;