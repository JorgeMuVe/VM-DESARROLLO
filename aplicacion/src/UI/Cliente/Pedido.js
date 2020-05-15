/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { unidadMedidaProducto } from '../../Componentes/Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {
    pedidoUsuario:[]
};

export class ClientePedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    componentDidMount(){
        let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
        pedidoUsuario = JSON.parse(pedidoUsuario);
        this.setState({pedidoUsuario});
    }

    render(){
        return(
            <div className="ClientePedido">
                <div className="usuario_encabezado">
                    <label> PEDIDO ACTUAL </label>
                </div>
                <div className="centrado">

                </div>
                <div className="usuario_tabla">
                    {(this.state.pedidoUsuario||[]).length > 0?
                    <div className="productos_lista">
                        {(this.state.pedidoUsuario||[]).map(producto =>
                            <div className="producto_item" key={producto.idProducto}>
                                <img src={producto.imagenTipoProducto} alt={producto.nombreProducto}/>
                                <div className="centrado">
                                    <div className="producto_item_datos">
                                        <label>
                                            <div style={{fontSize:"3vh"}}><b>{producto.nombreProducto}</b><br/></div>
                                            <div style={{fontSize:"2.9vh"}}>Precio: S/: {parseFloat(producto.precioPorUnidad||0).toFixed(2) + " x " + unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)}<br/></div>
                                            <div style={{fontSize:"2.5vh"}}><b>Disponible:  </b> {"5 KG"} <b> Tienda:  </b>{producto.nombreNegocio}</div>   
                                            <div style={{fontSize:"2vh"}}>Description -> (Más Información!...)</div>
                                        </label>
                                        <button onClick={()=>this.props.agregarCanasta(producto)}> + </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> :
                    <div> No se agregaron Productos al Pedido!.</div>}
                </div>
                <div className="centrado">
                    <button onClick={()=>this.props.cambiarPagina('confirmar')}> Comprar </button>
                </div>
            </div>
        )
    }
}

export default ClientePedido;
