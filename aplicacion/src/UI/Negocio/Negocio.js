/*
-- Description:     PAGINA PRINCIPAL DE USUARIO NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Ventas from './Ventas';
import Pedidos from './Pedidos';
import Productos from './Productos';

/* ICONOS */
import IconoGoogle from '../../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {
    ventasNegocio:[1],

    /**** P A G I N A S     N E G O C I O ****/
    paginaActual:'ventas'
};

export class Negocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    cambiarPagina = (pagina) => { this.setState({paginaActual:pagina}) }

    render(){
        return(
            <div className="Negocio centrado">

                <div className="negocio_componentes">

                    <div className="negocio_navegador">

                        <div className={"negocio_navegador_boton " + (this.state.paginaActual==="ventas"?"activo":"")}
                            onClick={()=>this.cambiarPagina("ventas")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Ventas</label>
                        </div>
                        <div className={"negocio_navegador_boton " + (this.state.paginaActual==="pedidos"?"activo":"")}
                            onClick={()=>this.cambiarPagina("pedidos")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Pedidos</label>
                        </div>
                        <div className={"negocio_navegador_boton " + (this.state.paginaActual==="productos"?"activo":"")}
                            onClick={()=>this.cambiarPagina("productos")}>
                            <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                            <label>Productos</label>
                        </div>
                        <div className="negocio_navegador_boton">
                            <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                            <label>Salir</label>
                        </div>
                    </div>

                    <div className="negocio_paginas centrado">
                        <div className={(this.state.paginaActual==="ventas"?"":"ocultar")}><Ventas/></div>
                        <div className={(this.state.paginaActual==="pedidos"?"":"ocultar")}><Pedidos/></div>
                        <div className={(this.state.paginaActual==="productos"?"":"ocultar")}><Productos/></div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Negocio;
