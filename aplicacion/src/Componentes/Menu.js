/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    redireccionar =(ruta)=>{ window.location.href = ruta }

    render(){
        return(
            <div className="Menu">
                <div className="menu_items">

                    <div className="menu_item_aplicacion" onClick={()=>this.props.controlMenuAplicacion()}>REACTIVA</div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/")}>INICIO</div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/#contacto")}>CONTACTO</div>
                    <div className="menu_item_logo centrado" onClick={()=>this.props.controlModalPedido()}>                    
                        <img src="/Logo.png" alt="Logo"></img>
                    </div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/productos/lista")}>PRODUCTOS</div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/#tiendas")}>TIENDAS</div>
                    <div className="menu_item_usuario" onClick={()=>this.props.controlModalIngreso()}>
                        {this.props.usuarioAplicacion.tipoUsuario!=="invitado"?"Mi Cuenta":"INGRESAR"}
                    </div>

                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Menu;