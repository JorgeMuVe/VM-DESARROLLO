/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Paginado from '../../Componentes/Paginado';
import { obtenerUsuario } from '../../Componentes/Funciones';
import { listarPedidoCliente_DB } from '../../DB/pedidoDB';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:{},
    clientePedidos:[],

    paginaActual:1,
    cantidadPaginas:1,
    pedidosPorPagina:10,

};

export class ClienteCompras extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    obtenerPedidosCliente =()=> {
        const Buscador={
            codigoUsuario: this.state.usuarioAplicacion.codigoUsuario,
            inicio: (this.state.paginaActual-1)*this.state.pedidosPorPagina,
            cantidad: this.state.pedidosPorPagina
        };
        listarPedidoCliente_DB(Buscador).then(res=>{
            if(!res.error){
                var cantidadPaginas = (res.cantidadPedidos / this.state.pedidosPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas||1);
                this.setState({cantidadPaginas,clientePedidos:res.listaPedidos})
            }
        });
    }

    

    /****  P A G I N A D O  ****/
    paginaSiguiente =()=> {
        const { paginaActual, cantidadPaginas } = this.state;
        if(paginaActual < cantidadPaginas){
            this.setState({paginaActual:paginaActual+1},()=> {
                this.obtenerPedidosCliente();
            });
        }
    }

    paginaAtras =()=> {
        const { paginaActual } = this.state;
        if(paginaActual>1){
            this.setState({paginaActual:paginaActual-1},()=> {
                this.obtenerPedidosCliente();
            });
        }
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
                    <div className="usuario_tabla_paginado">
                        <Paginado
                            paginaActual={this.state.paginaActual}
                            cantidadPaginas={this.state.cantidadPaginas}
                            paginaSiguiente={this.paginaSiguiente}
                            paginaAtras={this.paginaAtras}
                        />
                    </div>
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
                                        <b>S/. {parseFloat(pedido.totalPagar).toFixed(2)}</b><br/>
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
                        <Paginado
                            paginaActual={this.state.paginaActual}
                            cantidadPaginas={this.state.cantidadPaginas}
                            paginaSiguiente={this.paginaSiguiente}
                            paginaAtras={this.paginaAtras}
                        />
                    </div>
                </div> :
                <div> No Existen Compras Registradas</div>}
            </div>
        )
    }
}

export default ClienteCompras;
