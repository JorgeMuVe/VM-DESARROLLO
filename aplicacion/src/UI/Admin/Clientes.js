/*
-- Description:     PAGINA PRINCIPAL DE ADMIN CLIENTES
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';

/***  F U N C I O N E S  ***/

/***   ICONOS   ***/

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {};

export class AdminClientes extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="AdminClientes">
                Clientes del Sistema
            </div>
        )
    }
}

export default AdminClientes;