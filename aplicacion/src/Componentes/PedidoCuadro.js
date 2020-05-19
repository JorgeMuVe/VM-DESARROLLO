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
                                            <label><b>Producto {producto.nombreProducto}</b></label>
                                            <label>
                                                Precio: S/: {parseFloat(producto.precioPorUnidad||0).toFixed(2) + " x " + unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)}
                                                <b> - Disponible:  </b> {"5 KG"} <b> Tienda:  </b>{producto.nombreNegocio}
                                            </label>
                                            <label> Description -> (Más Información!...)</label>
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