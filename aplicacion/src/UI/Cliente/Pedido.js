/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { unidadMedidaProducto } from '../../Componentes/Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {
    pedidoUsuario:[]
};

export class ClientePedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    componentDidMount(){
        let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
        pedidoUsuario = JSON.parse(pedidoUsuario);
        this.setState({pedidoUsuario});
    }

    render(){
        return(
            <div className="ClientePedido">
                <div className="pedido_modal_titulo centrado">
                    <label> Mi Pedido </label>
                </div>
                <div className="cliente_pedido">
                    {(this.state.pedidoUsuario||[]).length > 0?
                    <div className="pedido_lista" style={{width:"80%"}}>
                        {(this.state.pedidoUsuario||[]).map(producto =>
                            <div className="pedido_lista_item" key={producto.idProducto} style={{background:"url(/img/fondos/verduras.jpg)"}}>
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
                </div>
                <div className="centrado">
                    <div className="pedido_modal_boton">
                        <button onClick={()=>this.props.cambiarPagina('confirmar')}> Comprar </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientePedido;
