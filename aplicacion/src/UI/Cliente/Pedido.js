/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class ClientePedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="ClientePedido">
                <div className="cliene_pedido_encabezado">
                    <label> PEDIDO ACTUAL </label>
                </div>

                <div className="cliene_pedido_tabla">
                    {(this.state.pedidoCliente||[]).length > 0?
                    <div className="cliente_pedido_tabla">
                        {(this.state.pedidoCliente||[]).map(producto =>
                        <div> Producto {producto} </div>)}
                    </div> :
                    <div> No se agregaron Productos al Pedido!.</div>}
                </div>
            </div>
        )
    }
}

export default ClientePedido;
