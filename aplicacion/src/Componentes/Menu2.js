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
            <div className="Menu2">
                <div className="menu2">
                    <NavLink to="/">INICIO</NavLink>
                    <NavLink to="/tiendas">TIENDAS</NavLink>
                    <NavLink to="/productos/lista">PRODUCTOS</NavLink>
                    <NavLink to="/dise">Nuevo</NavLink>

                    <div onClick={()=>this.props.controlModalIngreso()}>
                        {this.props.usuarioAplicacion.tipoUsuario!=="invitado"?"Mi Cuenta":"INGRESAR"}
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Menu;