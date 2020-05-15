/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/***  F U N C I O N E S  ***/
import { agregarPedido_DB, agregarPedidoDetalle_DB } from '../../DB/pedidoDB';
import { agregarVenta_DB } from '../../DB/ventaDB';

import { obtenerFechaHoy } from '../../Componentes/Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {

    pedidoUsuario:[],
    pedidoDetalle:[],

    datosConfirmacion:{},
    mostrarModalConfirmar:false
};

export class ConfirmarPedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    confirmarPedido =()=> {
        const { pedidoDetalles,ventasNegocios,datosConfirmacion } = this.state;
        agregarPedido_DB(datosConfirmacion).then(res=>{
            if(!res.error){
                var idPedido = (res[0][0].idPedido||"0");
                pedidoDetalles.forEach(detalle=>{
                    detalle["idPedido"] = idPedido;
                    console.log(detalle);
                    agregarPedidoDetalle_DB(detalle).then(_=>console.log(_));
                })
                ventasNegocios.forEach(venta=>{
                    venta["idPedido"] = idPedido;
                    console.log(venta);
                    agregarVenta_DB(venta).then(_=>console.log(_));
                })
                this.setState({mostrarModalConfirmar:false},()=>{
                    this.props.cambiarPagina("compras")
                });
            } else {console.log("ERROR >> AGREGAR PEDIDO!!..",res.error);}
        });
    }

    confirmarDatos =()=> {
        const { pedidoUsuario } = this.state;
       
        // DETALLE DEL PEDIDO DEL CLIENTE
        var pedidoDetalles = [], detalle = {}, totalPagar = 0;
        pedidoUsuario.forEach(p=>{
            detalle["idProducto"] = p.idProducto;
            detalle["cantidadProducto"] = (p.cantidadProducto||"1.45");
            totalPagar = totalPagar + p.precioPorUnidad
            pedidoDetalles.push(detalle);
        });
        
        // REGISTRO DE VENTA A NEGOCIO
        var ventasNegocios = [];
        pedidoUsuario.forEach(p=>{ var existeNegocio = false;
            ventasNegocios.forEach(n=>{if(n.idNegocio===p.idNegocio){ existeNegocio=true } })
            if(!existeNegocio){ ventasNegocios.push({idNegocio:p.idNegocio}) }
        });

        // DATOS EN GENERAL DEL PEDIDO DE CLIENTE
        var datosConfirmacion = {};
        datosConfirmacion["tipoUsuario"] = (this.props.usuarioAplicacion.tipoUsuario||"");
        datosConfirmacion["codigoUsuario"] = (this.props.usuarioAplicacion.codigoUsuario||"");
        datosConfirmacion["telefonoReferencia"] = document.getElementById("telefonoReferencia").value;
        datosConfirmacion["correoReferencia"] = document.getElementById("correoReferencia").value;
        datosConfirmacion["lat"] = "-13.9093"; datosConfirmacion["lng"] = " -40.3e223"; 
        datosConfirmacion["totalProductos"] = pedidoUsuario.length;
        datosConfirmacion["totalPagar"] = totalPagar;
        datosConfirmacion["fechaRegistro"] = obtenerFechaHoy();
        datosConfirmacion["estadoPedido"] = "Registrado";

        // ABRIR MODAL DE CONFIRMARCION
        this.setState({pedidoDetalles,ventasNegocios,datosConfirmacion},()=> this.controlModalConfirmar() );

    }

    controlModalConfirmar =()=> this.setState({mostrarModalConfirmar:!this.state.mostrarModalConfirmar})

    componentDidMount(){
        let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
        pedidoUsuario = JSON.parse(pedidoUsuario);
        this.setState({pedidoUsuario});
    }

    render(){
        return(
            <div>
                <div className="pedido_datos">
                    <div className="usuario_direccion">
                        <div className="item_direccion">
                            <div className="tipo_direccion">Casa</div>
                            <div className="tipo_direccion">San Jeronimo Calle Rodriguez Pastor 475</div>
                            <div className="tipo_direccion">Cerca a edficio de Telefonica</div>
                        </div>
                    </div>
                    <div className="usuario_datos">
                        <input required type="text" id="telefonoReferencia" placeholder="Telefono Referencia"/>
                        <input required type="email" id="correoReferencia" placeholder="Correo Referencia"/>
                    </div>
                </div>
                <div className="pedido_pago">
                    <div className="tipo_pago">
                        <label><input type="checkbox"/>Pago en Efectivo</label>
                        <label><input type="checkbox"/>Pago con Tarjeta</label>
                    </div>
                    <div className={(this.state.pedidoUsuario||[]).length>0 ? "pedido_siguiente":"ocultar"}>
                        <button onClick={()=>this.confirmarDatos()}> CONFIRMAR </button>
                    </div>
                </div>

                <Modal
                    mostrarModal={this.state.mostrarModalConfirmar}
                    controlModal={this.controlModalConfirmar}
                    tituloModal="CONFIRMAR PEDIDO"
                >
                    <div> TOTAL PRODUCTOS: {this.state.datosConfirmacion.totalProductos}</div> -
                    <div> TOTAL A PAGAR: {this.state.datosConfirmacion.totalPagar}</div> - 
                    <div className="centrado">
                        <button onClick={()=>this.confirmarPedido()}> CONFIRMAR </button>
                    </div>

                </Modal>
            </div>
        )
    }
}

export default ConfirmarPedido;
