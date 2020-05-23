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

/***  F U N C I O N E S  ***/
import { obtenerUsuario } from '../../Componentes/Funciones';
import { listarPedidoNegocio_DB } from '../../DB/pedidoDB';
import { listarVentaNegocio_DB } from '../../DB/ventaDB';

/***   ICONOS   ***/
import IconoGoogle from '../../SVG/IconoGoogle';

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {
    pedidosNegocio:[],
    ventasNegocio:[],
    /**** P A G I N A S     N E G O C I O ****/
    paginaActual:'',
};

export class Negocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    
    obtenerPedidos =(codigoUsuario)=> {
        listarPedidoNegocio_DB({codigoUsuario}).then(pedidos=>{
            if(!pedidos.error){
                this.setState({ pedidosNegocio: pedidos });
            } else { console.log("ERROR >> LISTAR PEDIDOS NEGOCIO"); }
        });
    }

    obtenerVentas =(codigoUsuario)=> {
        listarVentaNegocio_DB({codigoUsuario}).then(ventas=>{
            if(!ventas.error){
                this.setState({ ventasNegocio: ventas });
            } else { console.log("ERROR >> LISTAR VENTAS NEGOCIO"); }
        });
    }

    /*****    F U N C I O N E S    *****/
    cambiarPagina = (pagina) => {
        const usuarioAplicacion = obtenerUsuario();
        if(pagina.length<1) { pagina='pedidos' }
        if(pagina==='pedidos'){ this.obtenerPedidos(usuarioAplicacion.codigoUsuario||0);}
        if(pagina==='ventas'){ this.obtenerVentas(usuarioAplicacion.codigoUsuario||0);}

        this.setState({paginaActual:pagina},()=>{
            window.history.pushState("DATOS","TITULO","/usuario/negocio/"+pagina);
        });
    }

    mostrarPagina =()=> {
        const { paginaActual,pedidosNegocio,ventasNegocio } = this.state;
        const { usuarioAplicacion } = this.props;
        
        switch (paginaActual) {
            case "pedidos":
                return (
                <Pedidos pedidosNegocio={pedidosNegocio}/>);
            case "ventas": return (
                <Ventas ventasNegocio={ventasNegocio}/>);
            case "productos": return (
                <Productos usuarioAplicacion={usuarioAplicacion}/>);
            case "cuenta": return (<Cuenta/>);
            default: return null;
        }
    }

    inicarFunciones =()=> {
        const usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){
            if(usuarioAplicacion.tipoUsuario === "negocio"){
                /*  CONTROL PARA USUARIO NEGOCIO  */
                const pagina = this.props.match.params.pagina
                this.cambiarPagina(pagina);
            } else {window.location.href = '/';}
        } else {window.location.href = '/';}
    }

    componentDidMount(){
        this.inicarFunciones();
    }

    render(){
        if(this.state.paginaActual!==''){
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
                            <div className="usuario_navegador_boton" onClick={()=>this.props.salirSistema()}>
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
        } else { return null}
    }
}

export default Negocio;
