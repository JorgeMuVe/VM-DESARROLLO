/* COMPONENTES */
import React from 'react';
import { NavLink } from "react-router-dom";

/***   ICONOS   ***/
import IconoSacarProducto from '../SVG/IconoSacarPedido';
import IconoPedidoVacio from '../SVG/IconoPedidoVacio';

/* FUNCIONES */
import { unidadMedidaProducto, obtenerUsuario } from './Funciones';

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
        var precio = parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0).toFixed(2)+" x "+
        unidadMedidaProducto(cantidadProducto,producto.tipoUnidad)+(descuentoUnidad>0?(" (-"+producto.descuentoUnidad+"%)"):"");
        return precio;
    }

    calcularTotalPagar =()=> {
        var totalPagar = 0;
        (this.props.pedidoUsuario||[]).forEach(producto => {
            var precioProducto = parseFloat(producto.precioPorUnidad) * parseFloat(producto.cantidadProducto);
            var descuentoUnidad = producto.descuentoUnidad/100;
            var precio = parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0);
            totalPagar = totalPagar + precio;
        });
        return totalPagar.toFixed(2);
    }

    sacarProducto = (producto)=>{
        this.props.sacarProducto(producto);
    }

    comprarPedido =()=> {
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){
            if(usuarioAplicacion.tipoUsuario === 'cliente'){ 
                window.location.href = '/usuario/cliente/pedido' 
            }
            if(usuarioAplicacion.tipoUsuario === 'tienda'){ 
                alert("Ingrese con una cuenta cliente.");
                this.props.controlModalPedido();
            }
            if(usuarioAplicacion.tipoUsuario === 'invitado'){ 
                this.props.controlModalIngreso();
            }
        } else { 
            this.props.controlModalIngreso();
        }
    }
    
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
                            <div>
                                <div className="pedido_total">Total<b>:  S/.{this.calcularTotalPagar()}</b> </div>
                                <div className="pedido_lista">
                                    {(this.props.pedidoUsuario||[]).map((producto,i) =>
                                        <div className="pedido_lista_item" style={{background:"url("+producto.imagenProducto+")no-repeat center/cover"}} key={i}>
                                            <div className="pedido_lista_item_datos">
                                                <div onClick={()=>this.props.seleccionarProductoCantidad(producto)}>
                                                    <span>{(producto.nombreProducto||"").toUpperCase()}</span>
                                                    <span>{producto.nombreTienda}</span>
                                                    <span>Precio: <b>S/.{this.calcularPrecioProducto(producto)}</b></span> 
                                                </div>
                                                <button onClick={()=>this.props.sacarProducto(producto)}>
                                                    <IconoSacarProducto/>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="centrado">
                                    <div className="pedido_modal_boton">
                                        <button onClick={()=>this.comprarPedido()}> COMPRAR </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="pedido_vacio">
                                <div className="pedido_vacio_mensaje">
                                    <div><IconoPedidoVacio/></div>
                                    <span>No tienes productos en tu carrito</span>
                                    <label>Encuentra tus productos con un sólo un click</label>
                                    <NavLink className="pedido_vacio_mensaje_boton" to='/productos/buscador/TODO/_'>Comprar productos</NavLink>
                                </div>
                            </div>}
                            
                        </div>
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default ModalPedido;