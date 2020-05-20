/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/***  F U N C I O N E S  ***/
import { listarVentaNegocio_DB } from '../../DB/ventaDB';

/* VARIABLES GLOBALES */
const estadoInicial = {
    ventasNegocio:[],
    mostrarModalFechas:false,
};

export class NegocioVentas extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas})

    obtenerVentas =()=> {
        const { codigoUsuario } = this.props.usuarioAplicacion;
        listarVentaNegocio_DB({codigoUsuario:codigoUsuario}).then(ventas=>{
            if(!ventas.error){
                this.setState({ ventasNegocio: ventas });
            } else { console.log("ERROR >> LISTAR VENTAS NEGOCIO"); }
        });
    }

    componentDidMount(){
        this.obtenerVentas();
    }
    
    render(){
        return(
            <div className="NegocioVentas">
                <div className="Titulo">
                    <button>{"<"}</button>
                    <div>Ventas Realizadas</div>
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
                
                {(this.state.ventasNegocio||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>
                                <th> NR<br/>PEDIDO</th>
                                <th> FECHA </th>
                                <th> CLIENTE </th>
                                <th> INGRESO </th>
                                <th> </th>
                            </tr>
                        </thead>
                        {(this.state.ventasNegocio||[]).map((venta,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td>N° {venta.idVenta}</td>
                                    <td style={{textAlign:'center'}}>
                                        {venta.fechaRegistro.split(" ")[0]}<br/>
                                        {venta.fechaRegistro.split(" ")[1]}
                                    </td>
                                    <td> 
                                        Cliente: {venta.nombreCompleto+" "+venta.apellidoPaterno}<br/>
                                        <b>{venta.denominacionDireccion}</b><br/>
                                        {venta.referenciaDireccion}<br/>
                                        Correo: {venta.correoReferencia}<br/>
                                        Telefono: {venta.telefonoReferencia}
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        N° Productos: {venta.totalProductos}<br/>
                                        Total: S/. {(venta.totalPagar||0).toFixed(2)}<br/>
                                        Cargo: S/. 0.00
                                    </td>
                                    <td onClick={()=>alert(venta.idVenta)}> + </td>
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
