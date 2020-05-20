/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/***  F U N C I O N E S  ***/
import { listarPedidoNegocio_DB } from '../../DB/pedidoDB';

/* VARIABLES GLOBALES */
const estadoInicial = {
    pedidosNegocio:[],
    mostrarModalFechas:false,
};

export class NegocioPedidos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas})

    obtenerPedidos =()=> {
        const { codigoUsuario } = this.props.usuarioAplicacion;
        listarPedidoNegocio_DB({codigoUsuario:codigoUsuario}).then(pedidos=>{
            if(!pedidos.error){
                this.setState({ pedidosNegocio: pedidos });
            } else { console.log("ERROR >> LISTAR PEDIDOS NEGOCIO"); }
        });
    }

    componentDidMount(){
        this.obtenerPedidos();
    }
    
    render(){
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
                
                {(this.state.pedidosNegocio||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>
                                <th> NR<br/>PEDIDO</th>
                                <th> FECHA </th>
                                <th> REFERENCIA </th>
                                <th> CANT </th>
                                <th> PRECIO<br/>TOTAL </th>
                                <th> ESTADO </th>
                                <th> </th>
                            </tr>
                        </thead>
                        {(this.state.pedidosNegocio||[]).map((pedido,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td>N° {pedido.idPedido}</td>
                                    <td style={{textAlign:'center'}}>
                                        {pedido.fechaRegistro.split(" ")[0]}<br/>
                                        {pedido.fechaRegistro.split(" ")[1]}
                                    </td>
                                    <td>
                                        Cliente: {pedido.nombreCompleto+" "+pedido.apellidoPaterno}<br/>
                                        <b>{pedido.denominacionDireccion}</b><br/>
                                        {pedido.referenciaDireccion}<br/>
                                        Correo: {pedido.correoReferencia}<br/>
                                        Telefono: {pedido.telefonoReferencia}
                                    </td>
                                    <td style={{textAlign:'center'}}>{pedido.totalProductos}</td>
                                    <td>S/. {pedido.totalPagar.toFixed(2)}</td>
                                    <td>{pedido.estadoPedido.toUpperCase()}</td>
                                    <td onClick={()=>alert(pedido.idPedido)}> + </td>
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
