/* COMPONENTES */
import React from 'react';
import { NavLink } from "react-router-dom";

/***   ICONOS   ***/
import IconoGoogle from '../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class MenuNegocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    verificarPaginaActual =(pagina)=> {
        if(window.location.href.split("/usuario/negocio/")[1]===pagina){
            return "activo"
        } else {return ""}
    }
    
    render(){ //salirsistema
        return(
            <div className="usuario_navegador" onClick={()=>this.props.controlMenuUsuario()}>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("pedidos")}
                    to="/usuario/negocio/pedidos">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Pedidos</label>
                </NavLink>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("ventas")}
                    to="/usuario/negocio/ventas">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Ventas</label>
                </NavLink>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("productos")}
                    to="/usuario/negocio/productos">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Productos</label>
                </NavLink>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("cuenta")}
                    to="/usuario/negocio/cuenta">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Perfil</label>
                </NavLink>
                <div className="usuario_navegador_boton" onClick={()=>this.props.salirSistema()}>
                    <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                    <label>Salir </label>
                </div>
            </div>
        )
    }
}

export default MenuNegocio;