/*
-- Description:     PAGINA PRINCIPAL DE USUARIO TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';
import { Route } from 'react-router-dom'; // Libreria React-Router
import MenuNegocio from '../../Componentes/MenuNegocio';
import Tiendas from './Tiendas';
import Ventas from './Ventas';
import Cuenta from './Cuenta';

/***  F U N C I O N E S  ***/

/***   ICONOS   ***/

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {};

export class Tienda extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    componentDidMount(){
        var ruta = this.props.match.params.ruta==="_"?"tiendas":this.props.match.params.ruta;
        this.props.history.push("/usuario/negocio/"+ruta);
    }

    render(){
        return(
            <div className="Tienda centrado">

                <div className="usuario_componentes">

                    <div className="usuario_menu">
                        <MenuNegocio salirSistema={this.props.salirSistema}
                            controlMenuUsuario={this.props.controlMenuUsuario}/>
                    </div>

                    <div className="usuario_paginas">

                        <Route path="/usuario/negocio/tiendas" render={(props)=> <Tiendas abrirMensajeError={this.props.abrirMensajeError} {...props}/>}/>
                        <Route path="/usuario/negocio/ventas" render={(props)=> <Ventas {...props}/>}/>
                        <Route path="/usuario/negocio/cuenta" render={(props)=> <Cuenta {...props}/>}/>

                    </div>

                </div>
            </div>
        )
    }
}

export default Tienda;