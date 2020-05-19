/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import Pedido from './Pedido';
import Confirmar from './Confirmar';
import Compras from './Compras';
import Direcciones from './Direcciones';
import Cuenta from './Cuenta';

/***  F U N C I O N E S  ***/
import { listarPedidoCliente_DB } from '../../DB/pedidoDB';

/* ICONOS */
import IconoGoogle from '../../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {
    /*** D A T O S   A P L I C A C I O N */
    clientePedidos:[],

    /**** P A G I N A S     N E G O C I O ****/
    paginaActual:'pedido'
};

export class Cliente extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerPedidos =()=> {
        const { codigoUsuario } = this.props.usuarioAplicacion;
        listarPedidoCliente_DB({codigoUsuario:codigoUsuario}).then(pedidos=>{
            if(!pedidos.error){
                this.setState({clientePedidos:pedidos});
            }
        });
    }

    cambiarPagina =(pagina)=> { 
        if(pagina==="compras"){ this.obtenerPedidos() }
        this.setState({paginaActual:pagina});

    }
    
    mostrarPagina =()=> {
        const pagina = this.state.paginaActual;
        switch (pagina) {
            case "pedido": return (
                <Pedido 
                    cambiarPagina={this.cambiarPagina}
                    usuarioAplicacion={this.props.usuarioAplicacion}
                />);
            case "confirmar": return (
                <Confirmar
                    cambiarPagina={this.cambiarPagina}
                    usuarioAplicacion={this.props.usuarioAplicacion}
                />);
            case "compras": return (
                <Compras
                    clientePedidos={this.state.clientePedidos}
                />);
            case "direcciones": return (<Direcciones/>);
            case "cuenta": return (<Cuenta/>);
            default: return null;
        }
    
    }

    inicarFunciones =()=> {
        this.obtenerPedidos();
    }

    componentDidMount(){
        this.inicarFunciones();
    }

    render(){
        return(
            <div className="Cliente centrado">

                <div className="usuario_componentes">
                    <div className="usuario_navegador">
                        <div className={"usuario_navegador_boton " + (this.state.paginaActual==="pedido"?"activo":"")}
                            onClick={()=>this.cambiarPagina("pedido")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Pedido</label>
                        </div>
                        <div className={"usuario_navegador_boton " + (this.state.paginaActual==="compras"?"activo":"")}
                            onClick={()=>this.cambiarPagina("compras")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Compras</label>
                        </div>
                        <div className={"usuario_navegador_boton " + (this.state.paginaActual==="direcciones"?"activo":"")}
                            onClick={()=>this.cambiarPagina("direcciones")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Direcciones</label>
                        </div>
                        <div className={"usuario_navegador_boton " + (this.state.paginaActual==="cuenta"?"activo":"")}
                            onClick={()=>this.cambiarPagina("cuenta")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Perfil</label>
                        </div>
                        <div className="usuario_navegador_boton">
                            <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                            <label>Salir</label>
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

export default Cliente;
