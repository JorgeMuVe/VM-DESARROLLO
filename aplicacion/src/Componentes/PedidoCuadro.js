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
        return(
            <div className="PedidoCuadro">
                <input type="checkbox" id="checkbox_pedido" checked={this.state.pedido} onChange={()=>this.abrirPedido()}/>
                <label htmlFor="checkbox_pedido" className="boton_pedido"><IconoPedido/></label>
                <div className="lista_pedido">
                    <div> Lista de Pedidos</div>
                    <div>
                        {(this.props.pedidoUsuario||[]).map((producto,i)=>{
                            return (
                            <div key={i}>Producto {i}</div>
                            );
                        })}
                    </div>
                    <div className="centrado">
                        <button>Comprar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PedidoCuadro;