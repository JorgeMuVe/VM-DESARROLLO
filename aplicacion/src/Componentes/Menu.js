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

    render(){
        return(
            <div className="Menu">
                <div className="menu_items">

                    <div className="menu_item_ocultar">INICIO</div>
                    <div className="menu_item_mercados">MERCADOS</div>
                    <div className="menu_item_logo centrado" onClick={()=>this.props.abrirPedido()}>                    
                        <img src="/Logo.png" alt="Logo"></img>
                    </div>
                    <div className="menu_item_ocultar">CONTACTO</div>
                    <div className="menu_item_principal">INGRESAR</div>
                    
                </div>
            </div>
        )
    }
}

export default Menu;