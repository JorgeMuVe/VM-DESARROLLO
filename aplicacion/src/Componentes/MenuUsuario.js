/* COMPONENTES */
import React from 'react';
import { NavLink } from "react-router-dom";

/***   ICONOS   ***/
import IconoGoogle from '../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class MenuUsuario extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    verificarPaginaActual =(pagina)=> {
        if(window.location.href.split("/usuario/")[1]===pagina){
            return "activo"
        } else {return ""}
    }

    mostrarMenu =()=> {
        const {usuarioAplicacion} = this.props;
        if(usuarioAplicacion){
            var tipoUsuario = usuarioAplicacion.tipoUsuario;
            return(
                <div className="menu_usuario_navegador" onClick={()=>this.props.controlMenuUsuario()}>
                    <NavLink className={"menu_usuario_navegador_boton "+this.verificarPaginaActual(tipoUsuario+"/cuenta")}
                        to={"/usuario/"+tipoUsuario+"/cuenta"}>
                        <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                        <label>Perfil</label>
                    </NavLink>
                    <div className="menu_usuario_navegador_boton" onClick={()=>this.props.salirSistema()}>
                        <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                        <label>Salir </label>
                    </div>
                </div>
            )
        }
    }
    
    render(){
        if(this.props.mostrarMenuUsuario){
            return(            
                <div className="MenuUsuario" onClick={()=>this.props.controlMenuUsuario()}>
                    <div className="menu_usuario">
                        <div className="menu_usuario_opciones">
                            {this.mostrarMenu()}
                        </div>
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default MenuUsuario;


/*
import MenuCliente from '../Componentes/MenuCliente';
import MenuTienda from '../Componentes/MenuTienda';
import MenuNegocio from '../Componentes/MenuNegocio';
import MenuAdmin from '../Componentes/MenuAdmin';

switch (usuarioAplicacion.tipoUsuario) {
    case 'admin': 
        return <MenuAdmin
            controlMenuUsuario={this.props.controlMenuUsuario}
            salirSistema={this.props.salirSistema}/>
    case 'negocio': 
        return <MenuNegocio
            controlMenuUsuario={this.props.controlMenuUsuario}
            salirSistema={this.props.salirSistema}/>
    case 'cliente': 
        return <MenuCliente
            controlMenuUsuario={this.props.controlMenuUsuario}
            salirSistema={this.props.salirSistema}/>
    case 'tienda': 
        return <MenuTienda
            controlMenuUsuario={this.props.controlMenuUsuario}
            salirSistema={this.props.salirSistema}/>
    default: break;
}
*/