/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { obtenerUsuario } from '../../Componentes/Funciones';
import { listarPedidoCliente_DB } from '../../DB/pedidoDB';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:{},
    clientePedidos:[],
};

export class ClienteCompras extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    obtenerPedidosCliente =()=> {
        const { codigoUsuario } = this.state.usuarioAplicacion;
        listarPedidoCliente_DB({codigoUsuario:codigoUsuario}).then(pedidos=>{
            if(!pedidos.error){ this.setState({clientePedidos:pedidos}) }
        });
    }

    inicarFunciones =()=> {
        var usuarioAplicacion=obtenerUsuario();
        if(usuarioAplicacion){
            this.setState({usuarioAplicacion},()=>{
                this.obtenerPedidosCliente();
            });
        }
    }

    componentDidMount(){
        this.inicarFunciones();
    }

    render(){
        return(
            <div className="NegocioVentas">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Compras </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
                
                {(this.state.clientePedidos||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>
                                <th> PEDIDO</th>
                                <th> TOTAL </th>
                                <th> ESTADO</th>
                            </tr>
                        </thead>
                        {(this.state.clientePedidos||[]).map((pedido,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td style={{textAlign:'center'}}>
                                        N° <b>{pedido.idPedido}</b><br/>
                                        {(pedido.fechaRegistro||"").split(" ")[0]}
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <b>S/. {pedido.totalPagar.toFixed(2)}</b><br/>
                                        Cant:. {pedido.totalProductos}
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        {pedido.estadoPedido}
                                    </td>
                                </tr> 
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        Paginado
                    </div>
                </div> :
                <div> No Existen Compras Registradas</div>}
            </div>
        )
    }
}

export default ClienteCompras;
