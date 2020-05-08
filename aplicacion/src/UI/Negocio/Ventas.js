/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class NegocioVentas extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="NegocioVentas">

                <div className="negocio_ventas_encabezado">
                    <label> REGISTRO DE VENTAS </label>
                </div>
                
                {(this.state.ventasNegocio||[]).length > 0?
                <div className="negocio_ventas_tabla">
                    <table>
                        <thead>
                            <tr>
                                <th> NR PEDIDO</th>
                                <th> FECHA </th>
                                <th> PRECIO<br/>TOTAL</th>
                                <th> CARGOS </th>
                                <th> RECIBIDO </th>
                                <th> ESTADO</th>
                                <th> DETALLE</th>
                            </tr>
                        </thead>
                        {(this.state.ventasNegocio||[]).map((venta,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr>VENTA {i}</tr> 
                            </tbody>
                        )})}
                    </table>
                </div> :
                <div> No Existen Ventas Registradas</div>}
            </div>
        )
    }
}

export default NegocioVentas;
