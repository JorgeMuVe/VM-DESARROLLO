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
        return <b>S/. {
            //parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0).toFixed(2)+" x "+
            parseFloat(precioProducto||0).toFixed(2)+" x "+
            unidadMedidaProducto(cantidadProducto,producto.tipoUnidad)+
            (descuentoUnidad>0?(" (-"+producto.descuentoUnidad+"%)"):"")
        }</b>
    }

    calcularPrecioTotalProducto =(producto)=> {
        var precioProducto = parseFloat(producto.precioPorUnidad) * parseFloat(producto.cantidadProducto);
        var descuentoUnidad = parseFloat(producto.descuentoUnidad);
        return <b>
            Total: S/. {parseFloat(precioProducto||0).toFixed(2)+" -("+(producto.descuentoUnidad)+"%)"}<br/>
            Pagar: S/. {parseFloat(precioProducto-(precioProducto*(descuentoUnidad/100))||0).toFixed(2)}
        </b>
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
                <div>
                    <img src={productoSeleccionado.imagenProducto} alt="Imagen Producto"></img>
                </div>
                <div>
                    <div> {productoSeleccionado.nombreProducto} <br/> {productoSeleccionado.nombretipoProducto} </div>
                    <div> {this.calcularPrecioProducto(productoSeleccionado)} </div>
                </div>
                <div>
                    <button>(-)</button>
                    <input type="number" placeholder="Cantidad" id="cantidadProducto" 
                        defaultValue={this.props.productoSeleccionado.cantidadProducto}/>
                    <button>(+)</button>
                    <div> {this.calcularPrecioTotalProducto(productoSeleccionado)} </div>
                </div>
                <div>

                    <button onClick={this.props.agregarCantidadProducto}> AGREGAR </button>
                </div>
            </div>
            </Modal>
        ) } else { return null }
    }
}

export default ModalCantidad;