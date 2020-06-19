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
            <div className="menu_usuario_navegador" onClick={()=>this.props.controlMenuUsuario()}>
                <NavLink className={"menu_usuario_navegador_boton "+this.verificarPaginaActual("tiendas")}
                    to="/usuario/negocio/tiendas">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Tiendas</label>
                </NavLink>
                <NavLink className={"menu_usuario_navegador_boton "+this.verificarPaginaActual("cuenta")}
                    to="/usuario/negocio/cuenta">
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

export default MenuNegocio;