/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { Route, Redirect } from 'react-router-dom'; // Libreria React-Router

import MenuCliente from '../../Componentes/MenuCliente';
import Direcciones from './Direcciones';
import Confirmar from './Confirmar';
import Compras from './Compras';
import Pedido from './Pedido';
import Cuenta from './Cuenta';

/***  F U N C I O N E S  ***/

/* ICONOS */

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Cliente extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    
    render(){
        return(
            <div className="Cliente centrado">

                <div className="usuario_componentes">
                    <div className="usuario_menu">
                        <MenuCliente 
                            controlMenuUsuario={this.props.controlMenuUsuario} 
                            salirSistema={this.props.salirSistema}/>
                    </div>

                    <div className="usuario_paginas">

                        <Route path="/usuario/cliente/pedido" render={(props)=> <Pedido sacarProducto={this.props.sacarProducto} {...props}/>}/>
                        <Route path="/usuario/cliente/confirmar" render={(props)=> <Confirmar confirmarPedido={this.props.confirmarPedido}{...props}/>}/>
                        <Route path="/usuario/cliente/compras" render={(props)=> <Compras {...props}/>}/>
                        <Route path="/usuario/cliente/direcciones" component={Direcciones}/>
                        <Route path="/usuario/cliente/cuenta" render={(props)=> <Cuenta {...props}/>}/>
                        <Redirect from='/usuario/cliente/*' to='/usuario/cliente/pedido'/>

                    </div>
                </div>
            </div>
        )
    }
}

export default Cliente;
