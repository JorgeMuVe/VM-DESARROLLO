/* COMPONENTES */
import React from 'react';
import IconoSacarProducto from '../SVG/IconoSacarPedido';

/* FUNCIONES */
import { unidadMedidaProducto } from './Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class ModalPedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    calcularPrecioProducto =(producto)=> {
        var cantidadProducto = parseFloat(producto.unidadCantidad) * parseFloat(producto.cantidadProducto);
        var precioProducto = parseFloat(producto.precioPorUnidad) * parseFloat(producto.cantidadProducto);
        var descuentoUnidad = producto.descuentoUnidad/100;
        return <b>S/. {
            parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0).toFixed(2)+" x "+
            unidadMedidaProducto(cantidadProducto,producto.tipoUnidad)+
            (descuentoUnidad>0?(" (-"+producto.descuentoUnidad+"%)"):"")
        }</b>
    }

    sacarProducto = (producto)=>{
        this.props.sacarProducto(producto);
    }
    
    redireccionar =(ruta)=> { window.location.href = ruta}
    
    render(){
        if(this.props.mostrarPedido){
            return(            
                <div className="ModalPedido">
                    <div className="modal_pedido">
                        <div className="pedido_modal">
                            <div className="pedido_modal_titulo">
                                <label> Mi Pedido </label>
                            </div>
                            {(this.props.pedidoUsuario||[]).length > 0?
                            <div className="pedido_lista">
                                {(this.props.pedidoUsuario||[]).map((producto,i) =>
                                    <div className="pedido_lista_item" style={{background:"url("+producto.imagenProducto+")no-repeat center/cover"}} key={i}>
                                        <div className="pedido_lista_item_datos">
                                            <div onClick={()=>this.props.seleccionarProductoCantidad(producto)}>
                                                <span>{(producto.nombreProducto||"").toUpperCase()}</span>
                                                <span>{producto.nombreNegocio}</span>
                                                <span>Precio:{this.calcularPrecioProducto(producto)}</span> 
                                            </div>
                                            <button onClick={()=>this.props.sacarProducto(producto)}>
                                                <IconoSacarProducto/>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div> :
                            <div> No se agregaron Productos al Pedido!.</div>}
                            <div className="pedido_modal_boton centrado">
                                <button onClick={()=>this.redireccionar('/usuario/cliente/pedido')}> COMPRAR </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default ModalPedido;