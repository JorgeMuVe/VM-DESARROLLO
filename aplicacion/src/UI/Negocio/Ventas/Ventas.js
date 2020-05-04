/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Negocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="Negocio">
                Ventas
            </div>
        )
    }
}

export default Negocio;
