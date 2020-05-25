/*
-- Description:     PAGINA PRINCIPAL DE USUARIO NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';
import { Route, Redirect } from 'react-router-dom'; // Libreria React-Router
import MenuNegocio from '../../Componentes/MenuNegocio';
import Productos from './Productos';
import Pedidos from './Pedidos';
import Ventas from './Ventas';
import Cuenta from './Cuenta';

/***  F U N C I O N E S  ***/

/***   ICONOS   ***/

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {};

export class Negocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="Negocio centrado">

                <div className="usuario_componentes">

                    <div className="usuario_menu">
                        <MenuNegocio salirSistema={this.props.salirSistema}
                            controlMenuUsuario={this.props.controlMenuUsuario}/>
                    </div>

                    <div className="usuario_paginas">
                        <Route path="/usuario/negocio/pedidos" render={(props)=> <Pedidos {...props}/>}/>
                        <Route path="/usuario/negocio/ventas" render={(props)=> <Ventas {...props}/>}/>
                        <Route path="/usuario/negocio/productos" render={(props)=> <Productos {...props}/>}/>
                        <Route path="/usuario/negocio/cuenta" render={(props)=> <Cuenta {...props}/>}/>
                        <Redirect from='/usuario/negocio/*' to='/usuario/negocio/pedidos'/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Negocio;
