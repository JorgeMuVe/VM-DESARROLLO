/* COMPONENTES */
import React from 'react';
import { NavLink } from "react-router-dom";

/***   ICONOS   ***/
import IconoGoogle from '../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class MenuTienda extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    verificarPaginaActual =(pagina)=> {
        if(window.location.href.split("/usuario/tienda/")[1]===pagina){
            return "activo"
        } else {return ""}
    }
    
    render(){ //salirsistema
        return(
            <div className="menu_usuario_navegador" onClick={()=>this.props.controlMenuUsuario()}>
                <NavLink className={"menu_usuario_navegador_boton "+this.verificarPaginaActual("pedidos")}
                    to="/usuario/tienda/pedidos">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Pedidos</label>
                </NavLink>
                <NavLink className={"menu_usuario_navegador_boton "+this.verificarPaginaActual("ventas")}
                    to="/usuario/tienda/ventas">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Ventas</label>
                </NavLink>
                <NavLink className={"menu_usuario_navegador_boton "+this.verificarPaginaActual("productos")}
                    to="/usuario/tienda/productos">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Productos</label>
                </NavLink>
                <NavLink className={"menu_usuario_navegador_boton "+this.verificarPaginaActual("cuenta")}
                    to="/usuario/tienda/cuenta">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Perfil</label>
                </NavLink>
                <NavLink className="menu_usuario_navegador_boton" onClick={this.props.salirSistema}
                    to='/'>
                    <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                    <label>Salir</label>
                </NavLink>
            </div>
        )
    }
}

export default MenuTienda;