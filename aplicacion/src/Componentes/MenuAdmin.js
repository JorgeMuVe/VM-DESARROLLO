/* COMPONENTES */
import React from 'react';
import { NavLink } from "react-router-dom";

/***   ICONOS   ***/
import IconoGoogle from '../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class MenuAdmin extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    verificarPaginaActual =(pagina)=> {
        if(window.location.href.split("/usuario/admin/")[1]===pagina){
            return "activo"
        } else {return ""}
    }
    
    render(){ //salirsistema
        return(
            <div className="usuario_navegador" onClick={()=>this.props.controlMenuUsuario()}>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("negocios")}
                    to="/usuario/admin/negocios">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Negocios</label>
                </NavLink>
                <NavLink className={"usuario_navegador_boton "+this.verificarPaginaActual("clientes")}
                    to="/usuario/admin/clientes">
                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                    <label>Clientes</label>
                </NavLink>
                <div className="usuario_navegador_boton" onClick={()=>this.props.salirSistema()}>
                    <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                    <label>Salir </label>
                </div>
            </div>
        )
    }
}

export default MenuAdmin;