/*
-- Description:      MENU DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    redireccionar =(ruta)=>{ window.location.href = (this.props.urlAplicacion+ruta) }

    render(){
        return(
            <div className="Menu">
                <div className="menu_items">

                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/")}>INICIO</div>
                    <div className="menu_item_mercados" onClick={()=>this.redireccionar("/negocios")}>MERCADOS</div>
                    <div className="menu_item_logo centrado" onClick={()=>this.props.abrirPedido()}>                    
                        <img src="/Logo.png" alt="Logo"></img>
                    </div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/contacto")}>CONTACTO</div>
                    <div className="menu_item_principal" onClick={()=>this.props.controlModalIngreso()}>INGRESAR</div>
                    
                </div>
            </div>
        )
    }
}

export default Menu;