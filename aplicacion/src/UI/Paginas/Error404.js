/*
-- Description:      ERROR EN ENCONTRAR RUTA TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Error404 extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    render(){
        return(
            <div className="Error404">
                <b>ERROR 404</b>
            </div>
        )
    }
}

export default Error404;
