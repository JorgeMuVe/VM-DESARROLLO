/* COMPONENTES */
import React from 'react';
import { NavLink } from "react-router-dom";

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    redireccionar =(ruta)=>{ window.location.href = ruta }

    abrirModalPedido =()=> {
        if(sessionStorage.getItem('ciudad')!=='ciudad'){
            this.props.controlModalPedido()
        } else { alert("Seleccione una ciudad!.") }
    }

    render(){
        return(
            <div className="Menu">
                <div className="menu_items">

                    <div className="menu_item_aplicacion" onClick={()=>this.props.controlMenuAplicacion()}>REACTIVA</div>
                    <div className="menu_item_ocultar"><NavLink to="/">INICIO</NavLink></div>
                    <div className="menu_item_ocultar" onClick={()=>this.redireccionar("/#contacto")}>INICIO</div>
                    <div className="menu_item_logo centrado" onClick={()=>this.abrirModalPedido()}>                    
                        <img src="/Logo.png" alt="Logo"></img>
                    </div>
                    <div className="menu_item_ocultar"><NavLink to="/productos/lista">PRODUCTOS</NavLink></div>
                    <div className="menu_item_ocultar"><NavLink to="/tiendas">TIENDAS</NavLink></div>
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