/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class ClienteCompras extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="ClienteCompras">
                <div className="cliene_compras_encabezado">
                    <label> COMPRAS REGSITRADAS</label>
                </div>
                
                {(this.state.comprasCliente||[]).length > 0?
                <div className="cliene_compras_tabla">                    
                    <table className="tabla_ventas">
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
                        {(this.state.comprasCliente||[]).map((venta,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr>VENTA {i}</tr> 
                            </tbody>
                        )})}
                    </table>
                </div> :
                <div> No Existen Compras Registradas</div>}

            </div>
        )
    }
}

export default ClienteCompras;
