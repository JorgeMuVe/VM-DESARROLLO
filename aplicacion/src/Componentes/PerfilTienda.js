/*
-- Description:      PIE DE PAGINA DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import {buscarPerfilTienda_DB} from '../DB/tiendaDB'
/* ICONOS */

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class PiePagina extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    componentDidMount(){
        const Tienda = {
            idTienda:this.props.match.params.idTienda,
            nombre:'nombre'
        }
        console.log(Tienda);
        buscarPerfilTienda_DB(Tienda).then(res=>{
            console.log(res)
        })
    }

    render() {
        return (
            <div className="PerfilTienda">
                PerfilTienda
            </div>
        )
    }
}

export default PiePagina;