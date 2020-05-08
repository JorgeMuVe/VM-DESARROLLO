/*
-- Description:     PAGINA PRINCIPAL DE PRODUCTOS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Productos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="NegocioProductos">
                <table className="tabla_productos">
                    <thead>
                        <tr>
                            <th> NOMBRE </th>
                            <th> UNIDAD </th>
                            <th> PRECIO<br/>UNIDAD</th>
                            <th> DETALLE</th>
                        </tr>
                    </thead>
                    {(this.state.productosNegocio||[]).map((producto,i) => {
                        return ( 
                        <tbody key={i}>
                            <tr>PRODUCTO {i}</tr> 
                        </tbody>
                    )})}
                </table>
            </div>
        )
    }
}

export default Productos;
