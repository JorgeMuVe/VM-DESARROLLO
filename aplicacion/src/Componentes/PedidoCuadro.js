/*
-- Description:      PEDIDO DE CLIENTE DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import { unidadMedidaProducto } from '../Componentes/Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {
    pedido : false, // Abrir - Cerrar El Pedido
};

export class PedidoCuadro extends React.Component {
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

    render(){
        if(this.props.mostrarPedido){
            let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
            pedidoUsuario = JSON.parse(pedidoUsuario);
            return(            
                <div className="PedidoCuadro">  
                    <div className="pedido_modal">
                        <div className="pedido_modal_titulo">
                            <label> Mi Pedido </label>
                        </div>
                        {(pedidoUsuario||[]).length > 0?
                        <div className="pedido_lista">
                            {(pedidoUsuario||[]).map((producto,i) =>
                                <div className="pedido_lista_item" style={{background:"url(/img/fondos/verduras.jpg)"}} key={i}>
                                    <div className="pedido_lista_item_datos">
                                        <div>
                                            <label><b>{producto.nombreTipoProducto+" "+producto.nombreProducto} ({producto.nombreNegocio})</b></label>
                                            <label>Precio: 
                                                {this.calcularPrecioProducto(producto)}
                                            </label>
                                            <label>Description -> (Más Información!...)</label>
                                        </div>
                                        <button onClick={()=>this.props.agregarCanasta(producto)}> - </button>
                                    </div>
                                </div>
                            )}
                        </div> :
                        <div> No se agregaron Productos al Pedido!.</div>}
                        <div className="pedido_modal_boton centrado">
                            <button onClick={()=>this.props.redireccionar('/usuario/cliente')}> COMPRAR </button>
                        </div>
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default PedidoCuadro;