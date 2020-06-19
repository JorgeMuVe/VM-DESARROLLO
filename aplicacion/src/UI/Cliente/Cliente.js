/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { Route,Redirect } from 'react-router-dom'; // Libreria React-Router

import MenuCliente from '../../Componentes/MenuCliente';
import Direcciones from './Direcciones';
import Confirmar from './Confirmar';
import Compras from './Compras';
import Pedido from './Pedido';
import Cuenta from './Cuenta';

/***  F U N C I O N E S  ***/

/* ICONOS */

/* VARIABLES GLOBALES */
const estadoInicial = {
    abrirMenu:false
};

export class Cliente extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlMenuUsuario =()=> this.setState({abrirMenu:!this.state.abrirMenu})
    
    render(){
        return(
            <div className="Cliente centrado">                    
                <div className={this.state.abrirMenu?"MenuUsuario":"ocultar"} onClick={()=>this.controlMenuUsuario()}>
                    <div className="usuario_componentes_menu">
                        <MenuCliente 
                            controlMenuUsuario={this.controlMenuUsuario} 
                            salirSistema={this.props.salirSistema}/>
                    </div>
                </div>

                <div className="usuario_componentes">
                    <div className="usuario_menu">
                        <MenuCliente 
                            controlMenuUsuario={this.props.controlMenuUsuario} 
                            salirSistema={this.props.salirSistema}/>
                    </div>

                    <div className="usuario_paginas">
                        <Route path="/usuario/cliente/pedido" render={(props)=> 
                            <Pedido {...props}
                                controlMenuUsuario={this.controlMenuUsuario}
                                sacarProducto={this.props.sacarProducto}/>}>
                        </Route>

                        <Route path="/usuario/cliente/confirmar" render={(props)=> 
                            <Confirmar {...props}
                                controlMenuUsuario={this.controlMenuUsuario}
                                confirmarPedido={this.props.confirmarPedido}/>}>
                        </Route>

                        <Route path="/usuario/cliente/compras" render={(props)=>
                            <Compras controlMenuUsuario={this.controlMenuUsuario}{...props}/>}>
                        </Route>

                        <Route path="/usuario/cliente/direcciones" render={(props)=>
                            <Direcciones controlMenuUsuario={this.controlMenuUsuario}{...props}/>}>
                        </Route>

                        <Route path="/usuario/cliente/cuenta" render={(props)=>
                            <Cuenta controlMenuUsuario={this.controlMenuUsuario} {...props}/>}>    
                        </Route>

                        <Redirect from="/usuario/cliente/_" to="/usuario/cliente/pedido"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cliente;
