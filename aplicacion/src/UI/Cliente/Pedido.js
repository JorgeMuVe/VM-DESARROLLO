/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { unidadMedidaProducto } from '../../Componentes/Funciones';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';
import IconoSacarProducto from '../../SVG/IconoSacarPedido';

/* VARIABLES GLOBALES */
const estadoInicial = {
    pedidoUsuario:[]
};

export class ClientePedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    calcularPrecioProducto =(producto)=> {
        var cantidadProducto = parseFloat(producto.unidadCantidad) * parseFloat(producto.cantidadProducto);
        var precioProducto = parseFloat(producto.precioPorUnidad) * parseFloat(producto.cantidadProducto);
        var descuentoUnidad = producto.descuentoUnidad/100;
        return <b>S/. {
            parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0).toFixed(2)+" x "+
            unidadMedidaProducto(cantidadProducto,producto.tipoUnidad)+
            (descuentoUnidad>0?(" (-"+producto.descuentoUnidad+"%)"):"")
        }</b>
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
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mi Pedido </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
                <div className="centrado ocultar">
                    <div className="cliente_pedido_datos">
                        <div>Cantidad: {(this.state.pedidoUsuario||[]).length}</div>
                        <div>Precio: S/. {(this.state.pedidoUsuario||[]).length}</div>
                    </div>
                </div>
                <div className="cliente_pedido">
                    {(this.state.pedidoUsuario||[]).length > 0?
                    <div className="pedido_lista" style={{width:"80%"}}>
                        {(this.state.pedidoUsuario||[]).map((producto,i) =>
                            <div className="pedido_lista_item" key={i} style={{background:"url("+producto.imagenProducto+")no-repeat center/cover"}}>
                                <div className="pedido_lista_item_datos">
                                    <div>
                                        <label><b>{producto.nombreTipoProducto+" "+producto.nombreProducto} ({producto.nombreNegocio})</b></label>
                                        <label>Precio: 
                                            {this.calcularPrecioProducto(producto)}
                                        </label>
                                        <label>Description -> (Más Información!...)</label>
                                    </div>
                                    <button onClick={()=>this.sacarProducto(producto)}>
                                        <IconoSacarProducto/>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div> :
                    <div> No se agregaron Productos al Pedido!.</div>}
                </div>
                <div className="centrado">
                    <div className="pedido_modal_boton">
                        <button onClick={()=>this.props.history.push('/usuario/cliente/confirmar')}> Comprar </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientePedido;
