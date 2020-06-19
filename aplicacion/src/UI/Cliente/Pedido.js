/*
-- Description:     PAGINA PRINCIPAL DEL PEDIDO DEL CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { unidadMedidaProducto } from '../../Componentes/Funciones';

/* ICONOS */
import IconoSacarProducto from '../../SVG/IconoSacarPedido';
import IconoPedidoVacio from '../../SVG/IconoPedidoVacio';
import IconoMenu from '../../SVG/aplicacion/IconoMenu';

/* VARIABLES GLOBALES */
const estadoInicial = {
    pedidoUsuario:[]
};

export class ClientePedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    calcularTotalPagar =()=> {
        var totalPagar = 0;
        (this.state.pedidoUsuario||[]).forEach(producto => {
            var precioProducto = parseFloat(producto.precioPorUnidad) * parseFloat(producto.cantidadProducto);
            var descuentoUnidad = producto.descuentoUnidad/100;
            var precio = parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0);
            totalPagar = totalPagar + precio;
        });
        return totalPagar.toFixed(2);
    }

    calcularPrecioProducto =(producto)=> {
        var cantidadProducto = parseFloat(producto.unidadCantidad) * parseFloat(producto.cantidadProducto);
        var precioProducto = parseFloat(producto.precioPorUnidad) * parseFloat(producto.cantidadProducto);
        var descuentoUnidad = producto.descuentoUnidad/100;

        var precio = parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0).toFixed(2)+" x "+
        unidadMedidaProducto(cantidadProducto,producto.tipoUnidad)+(descuentoUnidad>0?(" (-"+producto.descuentoUnidad+"%)"):"");
        
        return precio;
    }

    obtenerPedido =()=> {
        setTimeout(() => {
            let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
            pedidoUsuario = JSON.parse(pedidoUsuario);
            this.setState({pedidoUsuario});
        }, 100);
    }

    sacarProducto =(producto)=>{
        this.props.sacarProducto(producto);
        this.obtenerPedido()
    }

    componentDidMount(){
        this.obtenerPedido();
    }

    render(){
        return(
            <div className="ClientePedido">
                <div className="usuario_encabezado">
                    <div className="usuario_encabezado_menu" onClick={this.props.controlMenuUsuario}><IconoMenu/></div>
                    <label> Mi Pedido </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
                <div className="cliente_pedido">
                    {(this.state.pedidoUsuario||[]).length > 0?
                    <div style={{width:"80%"}}>
                        <div className="pedido_lista">
                            <div className="pedido_total">Total<b>:  S/.{this.calcularTotalPagar()}</b> </div>
                            {(this.state.pedidoUsuario||[]).map((producto,i) =>
                            <div className="pedido_lista_item" key={i} style={{background:"url("+producto.imagenProducto+")no-repeat center/cover"}}>
                                <div className="pedido_lista_item_datos">
                                    <div>
                                        <label><b>{producto.nombreTipoProducto+" "+producto.nombreProducto} ({producto.nombreTienda})</b></label>
                                        <label>Precio: 
                                            <b>S/. {this.calcularPrecioProducto(producto)}</b>
                                        </label>
                                        <label>Description -> (Más Información!...)</label>
                                    </div>
                                    <button onClick={()=>this.sacarProducto(producto)}>
                                        <IconoSacarProducto/>
                                    </button>
                                </div>
                            </div>)}
                        </div>
                        <div className="centrado">
                            <div className="pedido_modal_boton">
                                <button onClick={()=>this.props.history.push('/usuario/cliente/confirmar')}> Comprar </button>
                            </div>
                        </div>
                    </div> :
                    <div className="pedido_vacio">
                        <div className="pedido_vacio_mensaje">
                            <div><IconoPedidoVacio/></div>
                            <span>No tienes productos en tu carrito</span>
                            <label>Encuentra tus productos con un sólo un click</label>
                            <button className="pedido_vacio_mensaje_boton" onClick={()=>this.props.history.push("/productos/buscador/TODO/_")}>Compras productos</button>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default ClientePedido;
