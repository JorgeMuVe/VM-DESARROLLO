/*
-- Description:      PEDIDO DE CLIENTE DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* IMPORT SVG */
import IconoPedido from '../SVG/IconoPedido';

/* VARIABLES GLOBALES */
const estadoInicial = {
    pedido : false, // Abrir - Cerrar El Pedido
};

export class PedidoCuadro extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    abrirPedido = () => { this.setState({pedido:!this.state.pedido}) }

    render(){
        if(this.props.mostrarPedido){
            return(
                <div className="PedidoCuadro centrado">
                    <div className="pedido_modal">
                        <h3> Lista de Pedidos</h3>
                        <div className="lista_pedido">
                            {(this.props.pedidoUsuario||[]).map((producto,i)=>{
                                return (
                                <div key={i}>Producto {i}</div>
                                );
                            })}
                        </div>
                        <div className="centrado">
                            <button onClick={()=>this.props.abrirPedido}>Comprar</button>
                        </div>
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default PedidoCuadro;