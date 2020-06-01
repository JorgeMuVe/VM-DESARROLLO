/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';
import Paginado from '../../Componentes/Paginado';

/* FUNCIONES */
import { obtenerUsuario, unidadMedidaProducto } from '../../Componentes/Funciones';
import { listarVentaTienda_DB } from '../../DB/ventaDB';
import { listarDetallesPedidoTienda_DB } from '../../DB/detalleDB';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:{},
    ventasTienda:[],
    mostrarModalFechas:false,

    ventaPaginaActual:1,
    ventaCantidadPaginas:1,
    ventasPorPagina:10,

    pedidoSeleccionado:{},
    detallesPedidoSeleccionado:[],

    detallePaginaActual:1,
    detalleCantidadPaginas:1,
    detallesPorPagina:10,
};

export class TiendaVentas extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas});
    controlModalDetalle =()=> this.setState({mostrarModalDetalle:!this.state.mostrarModalDetalle});
    abrirVentaDetalle =(venta)=> this.setState({pedidoSeleccionado:venta},()=>this.obtenerDetallesVenta())

    /* VENTAS */
    obtenerVentasTienda =()=> {
        const Buscador={
            codigoUsuario:this.state.usuarioAplicacion.codigoUsuario,
            inicio: (this.state.ventaPaginaActual-1)*this.state.ventasPorPagina,
            cantidad: this.state.ventasPorPagina
        };

        listarVentaTienda_DB(Buscador).then(res=>{
            if(!res.error){
                var ventaCantidadPaginas = (res.cantidadVentas / this.state.ventasPorPagina);
                ventaCantidadPaginas = Math.ceil(ventaCantidadPaginas||1);
                this.setState({ventaCantidadPaginas,ventasTienda:res.listaVentas})
            } else { console.log("ERROR >> LISTAR PEDIDOS TIENDA"); }
        });
    }

    obtenerDetallesVenta =()=> {
        const {pedidoSeleccionado,detallePaginaActual,detallesPorPagina} = this.state;
        const Pedido = {
            idTienda: this.state.usuarioAplicacion.codigoUsuario,
            idPedido: pedidoSeleccionado.idPedido,
            inicio: (detallePaginaActual-1)*detallesPorPagina,
            cantidad: detallesPorPagina
        }
        listarDetallesPedidoTienda_DB(Pedido).then(res=>{
            if(!res.error){
                var detalleCantidadPaginas = (res.cantidadDetalles / this.state.detallesPorPagina);
                detalleCantidadPaginas = Math.ceil(detalleCantidadPaginas||1);
                this.setState({detalleCantidadPaginas,detallesPedidoSeleccionado:res.listaDetalles})
            } else { console.log("ERROR >> LISTAR DETALLE"); }
            this.controlModalDetalle();
        });
    }
    
    /****  P A G I N A D O  ****/
    ventaPaginaSiguiente =()=> {
        const { ventaPaginaActual, ventaCantidadPaginas } = this.state;
        if(ventaPaginaActual < ventaCantidadPaginas){
            this.setState({ventaPaginaActual:ventaPaginaActual+1},()=> {
                this.obtenerVentasTienda();
            });
        }
    }

    ventaPaginaAtras =()=> {
        const { ventaPaginaActual } = this.state;
        if(ventaPaginaActual>1){
            this.setState({ventaPaginaActual:ventaPaginaActual-1},()=> {
                this.obtenerVentasTienda();
            });
        }
    }
    detallePaginaSiguiente =()=> {
        const { detallePaginaActual, detalleCantidadPaginas } = this.state;
        if(detallePaginaActual < detalleCantidadPaginas){
            this.setState({detallePaginaActual:detallePaginaActual+1},()=> {
                this.obtenerDetallesVenta();
            });
        }
    }

    detallePaginaAtras =()=> {
        const { detallePaginaActual } = this.state;
        if(detallePaginaActual>1){
            this.setState({detallePaginaActual:detallePaginaActual-1},()=>this.obtenerDetallesVenta());
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

    iniciarFunciones =()=> {
        this.obtenerVentasTienda();
    }

    componentDidMount(){
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){ this.setState({usuarioAplicacion},()=>this.iniciarFunciones()) }
    }
    
    render(){
        return(
            <div className="TiendaVentas">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Ventas </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
                
                {(this.state.ventasTienda||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <div className="usuario_tabla_paginado">
                        <Paginado
                            paginaActual={this.state.ventaPaginaActual}
                            cantidadPaginas={this.state.ventaCantidadPaginas}
                            paginaSiguiente={this.ventaPaginaSiguiente}
                            paginaAtras={this.ventaPaginaAtras}
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th> PEDIDO</th>
                                <th> CLIENTE </th>
                            </tr>
                        </thead>
                        {(this.state.ventasTienda||[]).map((venta,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.abrirVentaDetalle(venta)}>
                                    <td style={{textAlign:'center'}}>
                                        N° <b>{venta.idVenta}</b><br/>
                                        <b>S/. {parseFloat(venta.totalPagar).toFixed(2)}</b><br/>
                                        Cant: {venta.totalProductos}<br/>
                                        {(venta.fechaRegistro||"").split(" ")[0]}<br/>
                                        <b>{venta.estadoPedido.toUpperCase()}</b><br/>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        Cliente: {venta.nombreCompleto+" "+venta.apellidoPaterno}<br/>
                                        <b>{venta.denominacionDireccion}</b><br/>
                                        {venta.referenciaDireccion}<br/>
                                        Email: {venta.correoReferencia}<br/>
                                        Teléfono: {venta.telefonoReferencia}
                                    </td>
                                </tr> 
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        <Paginado
                            paginaActual={this.state.ventaventaPaginaActual}
                            cantidadPaginas={this.state.ventaCantidadPaginas}
                            paginaSiguiente={this.ventaPaginaSiguiente}
                            paginaAtras={this.ventaPaginaAtras}
                        />
                    </div>
                </div> :
                <div> No Existen Ventas Registradas</div>}
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
                                paginaActual={this.state.detalleventaventaPaginaActual}
                                cantidadPaginas={this.state.detalleventaCantidadPaginas}
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

export default TiendaVentas;
