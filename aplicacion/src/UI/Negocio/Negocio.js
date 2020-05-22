/*
-- Description:     PAGINA PRINCIPAL DE USUARIO NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';
import Pedidos from './Pedidos';
import Ventas from './Ventas';
import Cuenta from './Cuenta';
import Productos from './Productos';

/***  FUNCIONES  ***/


/***   ICONOS   ***/
import IconoGoogle from '../../SVG/IconoGoogle';

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {
    /**** P A G I N A S     N E G O C I O ****/
    paginaActual:'pedidos'
};

export class Negocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    cambiarPagina = (pagina) => {
        this.setState({paginaActual:pagina});
    }

    mostrarPagina =()=> {
        const { paginaActual } = this.state;
        const { usuarioAplicacion } = this.props;
        
        switch (paginaActual) {
            case "pedidos": return (
                <Pedidos usuarioAplicacion={usuarioAplicacion}/>);
            case "ventas": return (
                <Ventas usuarioAplicacion={usuarioAplicacion}/>);
            case "productos": return (
                <Productos usuarioAplicacion={usuarioAplicacion}/>);
            case "cuenta": return (<Cuenta/>);
            default: return null;
        }
    }

    inicarFunciones =()=> {
        const { usuarioAplicacion } = this.props;
        if(usuarioAplicacion.tipoUsuario !== "negocio"){
            /*  CONTROL PARA USUARIO NEGOCIO  */
        } else { alert("No es Un negocio"); }
    }

    componentDidMount(){
        this.inicarFunciones();
    }

    render(){
        return(
            <div className="Negocio centrado">

                <div className="usuario_componentes">

                    <div className="usuario_navegador">
                        <div className={"usuario_navegador_boton " + (this.state.paginaActual==="pedidos"?"activo":"")}
                            onClick={()=>this.cambiarPagina("pedidos")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Pedidos</label>
                        </div>
                        <div className={"usuario_navegador_boton " + (this.state.paginaActual==="ventas"?"activo":"")}
                            onClick={()=>this.cambiarPagina("ventas")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Ventas</label>
                        </div>
                        <div className={"usuario_navegador_boton " + (this.state.paginaActual==="productos"?"activo":"")}
                            onClick={()=>this.cambiarPagina("productos")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Productos</label>
                        </div>
                        <div className={"usuario_navegador_boton " + (this.state.paginaActual==="cuenta"?"activo":"")}
                            onClick={()=>this.cambiarPagina("cuenta")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Perfil</label>
                        </div>
                        <div className="usuario_navegador_boton">
                            <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                            <label>Salir </label>
                        </div>
                    </div>

                    <div className="usuario_paginas" onClick={this.props.salirSistema}>
                        {this.mostrarPagina()}
                    </div>

                </div>
            </div>
        )
    }
}

export default Negocio;
