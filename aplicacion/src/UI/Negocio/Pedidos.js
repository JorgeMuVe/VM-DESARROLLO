/*
-- Description:     PAGINA PRINCIPAL DE PEDIDOS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class NegocioPedidos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="NegocioPedidos">
                <div className="negocio_pedidos_encabezado">
                    <label> PEDIDOS REGISTRADOS</label>
                </div>

                {(this.state.pedidosNegocio||[]).length > 0?
                <div className="negocio_pedidos_tabla">
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
                        {(this.state.pedidosNegocio||[]).map((venta,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr>PEDIDO {i}</tr> 
                            </tbody>
                        )})}
                    </table>
                </div> :
                <div> No Existen Pedidos Registrados</div>}

                
            </div>
        )
    }
}

export default NegocioPedidos;
