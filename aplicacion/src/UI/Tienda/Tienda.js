/*
-- Description:     PAGINA PRINCIPAL DE USUARIO TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';
import { Route } from 'react-router-dom'; // Libreria React-Router
import MenuTienda from '../../Componentes/MenuTienda';
import Productos from './Productos';
import Pedidos from './Pedidos';
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
        var ruta = this.props.match.params.ruta==="_"?"pedidos":this.props.match.params.ruta;
        this.props.history.push("/usuario/tienda/"+ruta);
    }

    render(){
        return(
            <div className="Tienda centrado">

                <div className="usuario_componentes">

                    <div className="usuario_menu">
                        <MenuTienda salirSistema={this.props.salirSistema}
                            controlMenuUsuario={this.props.controlMenuUsuario}/>
                    </div>

                    <div className="usuario_paginas">

                        <Route path="/usuario/tienda/pedidos" render={(props)=> <Pedidos {...props}/>}/>
                        <Route path="/usuario/tienda/ventas" render={(props)=> <Ventas {...props}/>}/>
                        <Route path="/usuario/tienda/productos" render={(props)=> <Productos {...props}/>}/>
                        <Route path="/usuario/tienda/cuenta" render={(props)=> <Cuenta {...props}/>}/>

                    </div>

                </div>
            </div>
        )
    }
}

export default Tienda;