/*
-- Description:     PAGINA PRINCIPAL DE USUARIO TIENDA
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';
import { Route } from 'react-router-dom'; // Libreria React-Router
import MenuAdmin from '../../Componentes/MenuAdmin';
import Clientes from './Clientes';
import Negocios from './Negocios';

/***  F U N C I O N E S  ***/

/***   ICONOS   ***/

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {};

export class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    componentDidMount(){
        var ruta = this.props.match.params.ruta==="_"?"negocios":this.props.match.params.ruta;
        this.props.history.push("/usuario/admin/"+ruta);
    }

    render(){
        return(
            <div className="Tienda centrado">

                <div className="usuario_componentes">

                    <div className="usuario_menu">
                        <MenuAdmin salirSistema={this.props.salirSistema}
                            controlMenuUsuario={this.props.controlMenuUsuario}/>
                    </div>

                    <div className="usuario_paginas">

                        <Route path="/admin/admin/negocios" render={(props)=> <Negocios {...props}/>}/>
                        <Route path="/admin/admin/clientes" render={(props)=> <Clientes {...props}/>}/>

                    </div>

                </div>
            </div>
        )
    }
}

export default Admin;