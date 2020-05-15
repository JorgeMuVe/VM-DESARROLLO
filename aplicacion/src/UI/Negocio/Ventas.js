/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarModalFechas:false,
};

export class NegocioVentas extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas})
    
    render(){

        console.log(this.props);
        return(
            <div className="NegocioVentas">
                <div className="usuario_encabezado">
                    <label> REGISTRO DE VENTAS </label>
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
                
                {(this.props.ventasNegocio||[]).length > 0?
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
                        {(this.props.ventasNegocio||[]).map((venta,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td>N° {venta.idVenta}</td>
                                    <td>{venta.fechaRegistro}</td>
                                    <td>S/. {venta.totalPagar.toFixed(2)}</td>
                                    <td>S/. 0.80</td>
                                    <td>S/. 9.20</td>
                                    <td>{venta.estadoPedido.toUpperCase()}</td>
                                    <td onClick={()=>alert(venta.idPedido)}> + </td>
                                </tr> 
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        Paginado
                    </div>
                </div> :
                <div> No Existen Ventas Registradas</div>}
            </div>
        )
    }
}

export default NegocioVentas;
