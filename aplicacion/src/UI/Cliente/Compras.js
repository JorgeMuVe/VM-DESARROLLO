/*
-- Description:     PAGINA PRINCIPAL DE COMPRAS DE CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';
import Paginado from '../../Componentes/Paginado';

/* ICONOS */
import IconoMenu from '../../SVG/aplicacion/IconoMenu';

/* FUNCIONES */
import { obtenerUsuario, unidadMedidaProducto } from '../../Componentes/Funciones';
import { listarPedidoCliente_DB } from '../../DB/pedidoDB';
import { listarDetallesPedidoCliente_DB } from '../../DB/detalleDB';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:{},

    clientePedidos:[],
    pedidoPaginaActual:1,
    pedidoCantidadPaginas:1,
    pedidosPorPagina:10,

    pedidoSeleccionado:{},
    detallesPedidoSeleccionado:[],
    detallePaginaActual:1,
    detalleCantidadPaginas:1,
    detallesPorPagina:10,

};

export class ClienteCompras extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalDetalle =()=> this.setState({mostrarModalDetalle:!this.state.mostrarModalDetalle})

    abrirPedidoDetalle =(pedido)=>this.setState({pedidoSeleccionado:pedido},()=>this.obtenerDetallesPedido())

    obtenerPedidosCliente =()=> {
        const Buscador={
            codigoUsuario: this.state.usuarioAplicacion.codigoUsuario,
            inicio: (this.state.pedidoPaginaActual-1)*this.state.pedidosPorPagina,
            cantidad: this.state.pedidosPorPagina
        };
        listarPedidoCliente_DB(Buscador).then(res=>{
            if(!res.error){
                var pedidoCantidadPaginas = (res.cantidadPedidos / this.state.pedidosPorPagina);
                pedidoCantidadPaginas = Math.ceil(pedidoCantidadPaginas||1);
                this.setState({pedidoCantidadPaginas,clientePedidos:res.listaPedidos})
            }
        });
    }

    obtenerDetallesPedido =()=> {
        const {pedidoSeleccionado,detallePaginaActual,detallesPorPagina} = this.state;
        const Pedido = {
            idPedido: pedidoSeleccionado.idPedido,
            inicio: (detallePaginaActual-1)*detallesPorPagina,
            cantidad: detallesPorPagina
        }
        listarDetallesPedidoCliente_DB(Pedido).then(res=>{
            if(!res.error){
                var detalleCantidadPaginas = (res.cantidadDetalles / this.state.detallesPorPagina);
                detalleCantidadPaginas = Math.ceil(detalleCantidadPaginas||1);
                this.setState({detalleCantidadPaginas,detallesPedidoSeleccionado:res.listaDetalles})
            } else { console.log("ERROR >> LISTAR DETALLE"); }
            this.controlModalDetalle();
        });
    }

    /****  P A G I N A D O  ****/
    pedidoPaginaSiguiente =()=> {
        const { pedidoPaginaActual, pedidoCantidadPaginas } = this.state;
        if(pedidoPaginaActual < pedidoCantidadPaginas){
            this.setState({pedidoPaginaActual:pedidoPaginaActual+1},()=> {
                this.obtenerPedidosCliente();
            });
        }
    }

    pedidoPaginaAtras =()=> {
        const { pedidoPaginaActual } = this.state;
        if(pedidoPaginaActual>1){
            this.setState({pedidoPaginaActual:pedidoPaginaActual-1},()=> {
                this.obtenerPedidosCliente();
            });
        }
    }

    detallePaginaSiguiente =()=> {
        const { detallePaginaActual, detalleCantidadPaginas } = this.state;
        if(detallePaginaActual < detalleCantidadPaginas){
            this.setState({detallePaginaActual:detallePaginaActual+1},()=> {
                this.obtenerDetallesPedido();
            });
        }
    }

    detallePaginaAtras =()=> {
        const { detallePaginaActual } = this.state;
        if(detallePaginaActual>1){
            this.setState({detallePaginaActual:detallePaginaActual-1},()=>this.obtenerDetallesPedido());
        }
    }

    calcularPrecioProducto =(producto)=> {
        var precio = parseFloat(producto.precioPorUnidad||0).toFixed(2);
        var cantidad = parseFloat(producto.cantidadProducto||0).toFixed(0);
        var descuento = parseFloat(producto.descuentoUnidad||9).toFixed(2)/100;

        var precioProducto = precio+" x "+cantidad+" de "+
        unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)+
        (producto.descuentoUnidad>0?(" (-"+producto.descuentoUnidad+"%)"):"");

        var precioPagar = (precio*cantidad)-((precio*cantidad)*descuento);
        return <div>
            <b>TOTAL: S/. {precioPagar.toFixed(2)}</b>
            <br/>S/. {precioProducto}
        </div>
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
            <div className="TiendaVentas">
                <div className="usuario_encabezado">
                    <div className="usuario_encabezado_menu" onClick={this.props.controlMenuUsuario}><IconoMenu/></div>
                    <label> Mis Compras </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
                {(this.state.clientePedidos||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <div className="usuario_tabla_paginado">
                        <Paginado
                            paginaActual={this.state.pedidoPaginaActual}
                            cantidadPaginas={this.state.pedidoCantidadPaginas}
                            paginaSiguiente={this.pedidoPaginaSiguiente}
                            paginaAtras={this.pedidoPaginaAtras}
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
                                <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.abrirPedidoDetalle(pedido)}>
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
                            paginaActual={this.state.pedidoPaginaActual}
                            cantidadPaginas={this.state.pedidoCantidadPaginas}
                            paginaSiguiente={this.pedidoPaginaSiguiente}
                            paginaAtras={this.pedidoPaginaAtras}
                        />
                    </div>
                </div> :
                <div> No Existen Compras Registradas</div>}
                <Modal
                    controlModal={this.controlModalDetalle}
                    mostrarModal={this.state.mostrarModalDetalle}
                    tituloModal="Detalle de Pedido"
                >
                <div className="tienda_pedido_detalle">
                    <div>{this.state.pedidoSeleccionado.nombreCompleto+" "+this.state.pedidoSeleccionado.apellidoPaterno}</div>
                    <div>Total <b>S/. {this.state.pedidoSeleccionado.totalPagar}</b></div>
                    {(this.state.detallesPedidoSeleccionado||[]).length > 0?
                    <div className="tienda_pedido_detalle_tabla centrado">
                        <table>
                            <thead>
                                <tr>                            
                                    <th> PRODUCTO </th>
                                    <th> CANTIDAD </th>
                                </tr>
                            </thead>
                            {(this.state.detallesPedidoSeleccionado||[]).map((detalle,i) => {
                                return ( 
                                <tbody key={i}>
                                    <tr className={(i%2!==0?" interlinea":"")}>
                                        <td> <b>{detalle.nombreProducto}</b><br/>{detalle.detalleProducto} </td>
                                        <td> {this.calcularPrecioProducto(detalle)} </td>
                                    </tr>
                                </tbody>
                            )})}
                        </table>
                        <div className="usuario_tabla_paginado">
                            <Paginado
                                paginaActual={this.state.detallePaginaActual}
                                cantidadPaginas={this.state.detalleCantidadPaginas}
                                paginaSiguiente={this.detallePaginaSiguiente}
                                paginaAtras={this.detallePaginaAtras}
                            />
                        </div>
                    </div> :
                    <div>No Existen Productos Registrados.</div>}
                </div>
                </Modal>
            </div>
        )
    }
}

export default ClienteCompras;
