/*
-- Description:     PAGINA PRINCIPAL DE USUARIO TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';
import { Route,Redirect } from 'react-router-dom'; // Libreria React-Router

import MenuNegocio from '../../Componentes/MenuNegocio';
import Tiendas from './Tiendas';
import Ventas from './Ventas';
import Cuenta from './Cuenta';

/***  F U N C I O N E S  ***/

/***   ICONOS   ***/

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {
    abrirMenu:false
};

export class Tienda extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlMenuUsuario =()=> this.setState({abrirMenu:!this.state.abrirMenu})

    render(){
        return(
            <div className="Tienda centrado">
                <div className="usuario_componentes">

                    <div className="usuario_menu">
                        <MenuNegocio salirSistema={this.props.salirSistema}
                            controlMenuUsuario={this.props.controlMenuUsuario}/>
                    </div>

                    <div className="usuario_paginas">

                        <Route path="/usuario/negocio/tiendas" render={(props)=> 
                            <Tiendas {...props}
                                controlMenuUsuario={this.controlMenuUsuario}
                                abrirMensajeError={this.props.abrirMensajeError}/>}>
                        </Route>

                        <Route path="/usuario/negocio/ventas" render={(props)=>
                            <Ventas controlMenuUsuario={this.controlMenuUsuario}{...props}/>}>
                        </Route>

                        <Route path="/usuario/negocio/cuenta" render={(props)=>
                            <Cuenta controlMenuUsuario={this.controlMenuUsuario}{...props}/>}>
                        </Route>

                        <Redirect from="/usuario/negocio/_" to="/usuario/negocio/tiendas"/>

                    </div>

                    
                    <div className={this.state.abrirMenu?"MenuUsuario":"ocultar"} onClick={()=>this.controlMenuUsuario()}>
                        <div className="usuario_componentes_menu">
                            <MenuNegocio 
                                controlMenuUsuario={this.controlMenuUsuario} 
                                salirSistema={this.props.salirSistema}/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Tienda;