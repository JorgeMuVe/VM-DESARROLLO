/*
-- Description:      PEDIDO DE CLIENTE DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import { unidadMedidaProducto } from '../Componentes/Funciones';

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
                <div className="PedidoCuadro">  
                    <div className="pedido_modal">
                        <div className="usuario_encabezado">
                            <label> PEDIDO ACTUAL </label>
                        </div>
                        <div className="pedido_lista">
                            {(this.state.pedidoCliente||[1]).length > 0?
                            <div className="producto_buscador_lista">
                                {(this.state.pedidoCliente||[1,2,3]).map((producto,i) =>
                                    <div className="producto_buscador_lista_item" style={{background:"url(/img/fondos/verduras.jpg)"}} key={i}>
                                        <div className="producto_buscador_lista_item_datos">
                                            <div>
                                                <label><b>Producto {producto.nombreProducto}</b></label>
                                                <label>
                                                    Precio: S/: {parseFloat(producto.precioPorUnidad||0).toFixed(2) + " x " + unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)}
                                                    <b> - Disponible:  </b> {"5 KG"} <b> Tienda:  </b>{producto.nombreNegocio}
                                                </label>
                                                <label> Description -> (Más Información!...)</label>
                                            </div>
                                            <button onClick={()=>this.props.agregarCanasta(producto)}> - </button>
                                        </div>
                                    </div>
                                )}
                            </div> :
                            <div> No se agregaron Productos al Pedido!.</div>}
                        </div>
                        <div className="centrado">
                            <button> Comprar </button>
                        </div>
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default PedidoCuadro;


/*
import React from 'react';
import { urlAplicacionDesarrollo } from './Funciones';

const estadoInicial = {};

export class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    redireccionar =(ruta)=>{ window.location.href = (urlAplicacionDesarrollo+ruta) }

    render(){
        return(
            <div className="Menu">
                <div className="menu_items">

                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/#paginas")}>INICIO</div>
                    <div className="menu_item_mercados" onClick={()=>this.redireccionar("/#tiendas")}>TIENDAS</div>
                    <div className="menu_item_logo centrado" onClick={()=>this.props.abrirPedido()}>                    
                        <img src="/Logo.png" alt="Logo"></img>
                    </div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/#contacto")}>CONTACTO</div>
                    <div className="menu_item_principal" onClick={()=>this.props.controlModalIngreso()}>INGRESAR</div>
                    
                </div>
            </div>
        )
    }
}

export default Menu;
*/