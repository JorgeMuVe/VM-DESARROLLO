/*
-- Description:     PAGINA PRINCIPAL DE ADMIN NEGOCIOS
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  COMPONENTES  ***/
import React from 'react';

/***  F U N C I O N E S  ***/

/***   ICONOS   ***/

/***  VARIABLES GLOBALES  ***/
const estadoInicial = {};

export class AdminNegocios extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="AdminNegocios">
                Negocios del Sistema
            </div>
        )
    }
}

export default AdminNegocios;