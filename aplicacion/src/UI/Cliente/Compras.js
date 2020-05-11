/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/* VARIABLES GLOBALES */
const estadoInicial = {
};

export class ClienteCompras extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="NegocioVentas">
                <div className="usuario_encabezado">
                    <label> REGISTRO DE COMPRAS </label>
                    <div className="usuario_encabezado_opciones">
                        <select>
                            <option>Ordenar Por</option>
                            <option>Fecha</option>
                            <option>Estado</option>
                        </select>
                        <label onClick={()=>this.controlModalFechas()}> Rango de Fechas </label>
                        <Modal
                            mostrarModal={this.state.mostrarModalFechas}
                            controlModal={this.controlModalFechas}
                            tituloModal={"Rango de fechas"}
                        >
                        <div className="rango_fechas">
                            <input type="date"/>
                            <input type="date"/>
                        </div>
                        </Modal>

                    </div>
                </div>
                
                {(this.state.comprasCliente||[1]).length > 0?
                <div className="usuario_tabla centrado">
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
                        {(this.state.comprasCliente||[1,2,3,4,5,6]).map((compra,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td>N° 000{i}</td>
                                    <td>Enero 20, 2020</td>
                                    <td>S/. 10.00</td>
                                    <td>S/. 0.80</td>
                                    <td>S/. 9.20</td>
                                    <td>Entregado</td>
                                    <td> + </td>
                                </tr> 
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        Paginado
                    </div>
                </div> :
                <div> No Existen Compras Registradas</div>}
            </div>
        )
    }
}

export default ClienteCompras;
