/* COMPONENTES */
import React from 'react';
import { NavLink } from "react-router-dom";

/***   ICONOS   ***/
import IconoGoogle from '../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class MenuCliente extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    verificarPaginaActual =(pagina)=> {
        if(window.location.href.split("/usuario/cliente/")[1]===pagina){
            return "activo"
        } else {return ""}
    }
    
    render(){ // paginaActualCliente,salirsistema
        return(
            <div className="usuario_navegador" onClick={()=>this.props.controlMenuUsuario()}>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("pedido")}
                    to='/usuario/cliente/pedido'>
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Pedido</label>
                </NavLink>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("compras")}
                    to='/usuario/cliente/compras'>
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Compras</label>
                </NavLink>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("direcciones")}
                    to='/usuario/cliente/direcciones'>
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Direcciones</label>
                </NavLink>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("cuenta")}
                    to='/usuario/cliente/cuenta'>
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Perfil</label>
                </NavLink>
                <div className="usuario_navegador_boton" onClick={this.props.salirSistema}>
                    <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                    <label>Salir</label>
                </div>
            </div>
        )
    }
}

export default MenuCliente;