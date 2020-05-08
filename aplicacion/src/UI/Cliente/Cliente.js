/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import Pedido from './Pedido';
import Compras from './Compras';
import Direcciones from './Direcciones';


/* ICONOS */
import IconoGoogle from '../../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {
    ventasusuario:[1],

    /**** P A G I N A S     N E G O C I O ****/
    paginaActual:'compras'
};

export class Cliente extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    cambiarPagina = (pagina) => { this.setState({paginaActual:pagina}) }

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
                        <div className="usuario_navegador_boton">
                            <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                            <label>Salir</label>
                        </div>
                    </div>

                    <div className="usuario_paginas centrado">
                        <div className={(this.state.paginaActual==="pedido"?"":"ocultar")}><Pedido/></div>
                        <div className={(this.state.paginaActual==="compras"?"":"ocultar")}><Compras/></div>
                        <div className={(this.state.paginaActual==="direcciones"?"":"ocultar")}><Direcciones/></div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Cliente;
