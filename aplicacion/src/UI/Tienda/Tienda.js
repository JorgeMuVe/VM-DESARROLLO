/*
-- Description:     PAGINA PRINCIPAL DE USUARIO TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';
import { Route,Redirect } from 'react-router-dom'; // Libreria React-Router

import MenuTienda from '../../Componentes/MenuTienda';
import Productos from './Productos';
import Pedidos from './Pedidos';
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
                <div className={this.state.abrirMenu?"MenuUsuario":"ocultar"} onClick={()=>this.controlMenuUsuario()}>
                    <div className="usuario_componentes_menu">
                        <MenuTienda 
                            controlMenuUsuario={this.controlMenuUsuario} 
                            salirSistema={this.props.salirSistema}/>
                    </div>
                </div>

                <div className="usuario_componentes">

                    <div className="usuario_menu">
                        <MenuTienda salirSistema={this.props.salirSistema}
                            controlMenuUsuario={this.props.controlMenuUsuario}/>
                    </div>

                    <div className="usuario_paginas">

                        <Route path="/usuario/tienda/pedidos" render={(props)=>
                            <Pedidos controlMenuUsuario={this.controlMenuUsuario}{...props}/>}>
                        </Route>
                        <Route path="/usuario/tienda/ventas" render={(props)=>
                            <Ventas controlMenuUsuario={this.controlMenuUsuario}{...props}/>}>
                        </Route>
                        <Route path="/usuario/tienda/productos" render={(props)=>
                            <Productos controlMenuUsuario={this.controlMenuUsuario}{...props}/>}>
                        </Route>

                        <Route path="/usuario/tienda/cuenta" render={(props)=>
                            <Cuenta controlMenuUsuario={this.controlMenuUsuario}{...props}/>}>
                        </Route>

                        <Redirect from="/usuario/tienda/_" to="/usuario/tienda/pedidos"/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Tienda;