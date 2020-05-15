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
    
    componentDidMount(){
        console.log(this.props.clientePedidos);
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
                
                {(this.props.clientePedidos||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>
                                <th> NR PEDIDO</th>
                                <th> FECHA </th>
                                <th> PRECIO<br/>TOTAL </th>
                                <th> CANTIDAD<br/>PRODUCTOS </th>
                                <th> ESTADO</th>
                                <th> DETALLE</th>
                            </tr>
                        </thead>
                        {(this.props.clientePedidos||[]).map((pedido,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td>N° {pedido.idPedido}</td>
                                    <td>{pedido.fechaRegistro}</td>
                                    <td>{pedido.totalPagar}</td>
                                    <td>{pedido.totalProductos}</td>
                                    <td>{pedido.estadoPedido}</td>
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
