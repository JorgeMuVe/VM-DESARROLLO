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

export class NegocioPedidos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas})
    
    render(){

        console.log(this.props);
        return(
            <div className="NegocioVentas">
                <div className="Titulo">
                    <button>{"<"}</button>
                    <div>Pedidos registrados</div>
                </div>
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
                
                {(this.props.pedidosNegocio||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>
                                <th> NR<br/>PEDIDO</th>
                                <th> FECHA </th>
                                <th> CANT </th>
                                <th> PRECIO<br/>TOTAL </th>
                                <th> REFERENCIA </th>
                                <th> ESTADO </th>
                                <th> </th>
                            </tr>
                        </thead>
                        {(this.props.pedidosNegocio||[]).map((venta,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td>N° {venta.idVenta}</td>
                                    <td style={{textAlign:'center'}}>{venta.fechaRegistro}</td>
                                    <td style={{textAlign:'center'}}>10</td>
                                    <td>S/. {venta.totalPagar.toFixed(2)}</td>
                                    <td>                       
                                        <span><b>{"San Jeronimo Calle Rodriguez Pastor 475"}</b><br/>
                                        {"Cerca a edficio de Telefonica"}<br/>
                                        {"Correo: miaskharlet@gmail.com"}<br/>
                                        {"Telefono: 213213"}</span>
                                    </td>
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
                <div> No Existen Pedidos Registradas</div>}
            </div>
        )
    }
}

export default NegocioPedidos;
