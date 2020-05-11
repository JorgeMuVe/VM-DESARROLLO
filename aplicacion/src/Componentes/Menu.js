/*
-- Description:      MENU DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import PedidoCuadro from './PedidoCuadro';
import { urlAplicacionDesarrollo } from './Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarPedido:false
};

export class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    redireccionar =(ruta)=>{ window.location.href = (urlAplicacionDesarrollo+ruta) }

    abrirPedido =()=>{
        this.setState({mostrarPedido:!this.state.mostrarPedido});
    }

    render(){
        return(
            <div className="Menu">
                <div className="menu_items">

                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/#paginas")}>INICIO</div>
                    <div className="menu_item_mercados" onClick={()=>this.redireccionar("/#tiendas")}>TIENDAS</div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/#contacto")}>CONTACTO</div>
                    <div className="menu_item_logo centrado" onClick={()=>this.abrirPedido()}>                    
                        <img src="/Logo.png" alt="Logo"></img>
                    </div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/#envios")}>ENVIOS</div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/productos/lista")}>PRODUCTOS</div>
                    <div className="menu_item_principal" onClick={()=>this.props.controlModalIngreso()}>INGRESAR</div>

                </div>

                <PedidoCuadro
                    mostrarPedido={this.state.mostrarPedido}
                    abrirPedido={this.abrirPedido}
                    pedidoUsuario={this.state.pedidoUsuario} 
                ></PedidoCuadro>
            </div>
        )
    }
}

export default Menu;