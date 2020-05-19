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
import { listarVentaNegocio_DB } from '../../DB/ventaDB';

/***   ICONOS   ***/
import IconoGoogle from '../../SVG/IconoGoogle';

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {
    productosNegocio:[],
    ventasNegocio:[],

    /**** P A G I N A S     N E G O C I O ****/
    paginaActual:'pedidos'
};

export class Negocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    cambiarPagina = (pagina) => { 
        if(pagina==="ventas"){this.obtenerVentas()}
        this.setState({paginaActual:pagina});
    }

    mostrarPagina =()=> {
        const pagina = this.state.paginaActual;
        switch (pagina) {
            case "pedidos": return (
                <Pedidos
                    pedidosNegocio={this.state.ventasNegocio}
                />);
            case "ventas": return (
                <Ventas
                    ventasNegocio={this.state.ventasNegocio}
                />);
            case "productos": return (
                <Productos 
                    usuarioAplicacion={this.props.usuarioAplicacion}
                />);
            case "cuenta": return (<Cuenta/>);
            default: return null;
        }
    }

    obtenerVentas =()=> {
        const { codigoUsuario } = this.props.usuarioAplicacion;
        listarVentaNegocio_DB({codigoUsuario:codigoUsuario}).then(ventas=>{
            if(!ventas.error){
                this.setState({ ventasNegocio: ventas });
            } else { console.log("ERROR >> LISTAR VENTAS NEGOCIO"); }
        });
    }

    inicarFunciones =()=> {
        const { usuarioAplicacion } = this.props;
        if(usuarioAplicacion.tipoUsuario !== "negocio"){
            /*  CONTROL PARA USUARIO NEGOCIO  */
            this.obtenerVentas();
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

                    <div className="usuario_paginas">
                        {this.mostrarPagina()}
                    </div>

                </div>
            </div>
        )
    }
}

export default Negocio;
