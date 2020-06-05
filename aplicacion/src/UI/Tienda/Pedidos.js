/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';
import Paginado from '../../Componentes/Paginado';

import { obtenerUsuario, unidadMedidaProducto } from '../../Componentes/Funciones';
import { listarPedidoTienda_DB } from '../../DB/pedidoDB';
import { listarDetallesPedidoTienda_DB } from '../../DB/detalleDB';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
let map;
const estadoInicial = {
    usuarioAplicacion:{},

    mostrarModalDetalle:false,
    mostrarModalMapa:false,
    mostrarModalFechas:false,

    pedidosTienda:[],
    pedidoSeleccionado:{},
    detallesPedidoSeleccionado:[],

    pedidoPaginaActual:1,
    pedidoCantidadPaginas:1,
    pedidosPorPagina:10,

    detallePaginaActual:1, 
    detalleCantidadPaginas:1,
    detallesPorPagina:10
};

export class TiendaPedidos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalDetalle =()=> this.setState({mostrarModalDetalle:!this.state.mostrarModalDetalle});
    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas})
    controlModalMapa =()=> this.setState({mostrarModalMapa:!this.state.mostrarModalMapa})

      /* PEDIDOS */
    obtenerPedidosTienda =()=> {
        const Buscador={
            codigoUsuario:this.state.usuarioAplicacion.codigoUsuario,
            inicio: (this.state.pedidoPaginaActual-1)*this.state.pedidosPorPagina,
            cantidad: this.state.pedidosPorPagina
        };
        listarPedidoTienda_DB(Buscador).then(res=>{
            if(!res.error){
                var pedidoCantidadPaginas = (res.cantidadPedidos / this.state.pedidosPorPagina);
                pedidoCantidadPaginas = Math.ceil(pedidoCantidadPaginas||1);
                this.setState({pedidoCantidadPaginas,pedidosTienda:res.listaPedidos})
            } else { console.log("ERROR >> LISTAR PEDIDOS TIENDA"); }
        });
    }

    obtenerDetallesPedido =()=> {
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

    abrirPedidoDetalle =(pedido)=> this.setState({pedidoSeleccionado:pedido},()=>this.obtenerDetallesPedido())

    abrirMapaPedidos =()=>{
        this.controlModalMapa();
        setTimeout(this.mostrarMapa,100);
    }

    mostrarMapa =()=> {
        map = new window.google.maps.Map(document.getElementById('map'),{
            center: new window.google.maps.LatLng(-13.537623654609476,-71.90437483693309),
            zoom: 14, mapTypeId: 'roadmap'
        });

        const {pedidosTienda} = this.state;
        (pedidosTienda||[]).forEach(pedido=>{
            var position = {
                lat: parseFloat(pedido.lat || -13.537623654609476),
                lng: parseFloat(pedido.lng || -71.90437483693309) 
            };
            var mark = new window.google.maps.Marker({position});
            mark.setMap(map);
        });

    }

    /****  P A G I N A D O  ****/
    pedidoPaginaSiguiente =()=> {
        const { pedidoPaginaActual, pedidoCantidadPaginas } = this.state;
        if(pedidoPaginaActual < pedidoCantidadPaginas){
            this.setState({pedidoPaginaActual:pedidoPaginaActual+1},()=> {
                this.obtenerPedidosTienda();
            });
        }
    }

    pedidoPaginaAtras =()=> {
        const { pedidoPaginaActual } = this.state;
        if(pedidoPaginaActual>1){
            this.setState({pedidoPaginaActual:pedidoPaginaActual-1},()=> {
                this.obtenerPedidosTienda();
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

    iniciarFunciones =()=> {
        this.obtenerPedidosTienda()
    }

    componentDidMount(){
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){ this.setState({usuarioAplicacion},()=>this.iniciarFunciones()) }
    }
    
    render(){
        return(
            <div className="TiendaPedidos">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Pedidos </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
                <div className="usuario_encabezado_opciones">
                    <a href="#map" onClick={()=>this.abrirMapaPedidos()} >
                        Mostrar Mapa de Pedidos
                    </a>
                </div>
                
                {(this.state.pedidosTienda||[]).length > 0?
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
                                <th> REFERENCIA </th>
                            </tr>
                        </thead>
                        {(this.state.pedidosTienda||[]).map((pedido,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.abrirPedidoDetalle(pedido)}>
                                    <td style={{textAlign:'center'}}>
                                        N° <b>{pedido.idPedido}</b><br/>
                                        <b>S/. {parseFloat(pedido.totalPagar).toFixed(2)}</b><br/>
                                        Cant: {pedido.totalProductos}<br/>
                                        {(pedido.fechaRegistro||"").split(" ")[0]}<br/>
                                        <b>{pedido.estadoPedido.toUpperCase()}</b><br/>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        Cliente: {pedido.nombreCompleto+" "+pedido.apellidoPaterno}<br/>
                                        <b>{pedido.denominacionDireccion}</b><br/>
                                        {pedido.referenciaDireccion}<br/>
                                        Email: {pedido.correoReferencia}<br/>
                                        Teléfono: {pedido.telefonoReferencia}
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
                <div> No Existen Pedidos Registradas</div>}
                <Modal
                    controlModal={this.controlModalMapa}
                    mostrarModal={this.state.mostrarModalMapa}
                    tituloModal="Mapa de Pedidos"
                >
                    <div className="tienda_pedido_mapa" id="map"></div>
                </Modal>
                <Modal
                    controlModal={this.controlModalDetalle}
                    mostrarModal={this.state.mostrarModalDetalle}
                    tituloModal="Detalle de Pedido"
                >
                <div className="tienda_pedido_detalle">
                    <div>{this.state.pedidoSeleccionado.nombreCompleto+" "+this.state.pedidoSeleccionado.apellidoPaterno}</div>
                    <div>Total <b>S/. {parseFloat(this.state.pedidoSeleccionado.totalPagar||0).toFixed(2)}</b></div>
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

export default TiendaPedidos;
