/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/***  F U N C I O N E S  ***/
import { listarDirecciones_DB, agregarDireccion_DB } from '../../DB/direccionDB';
import { agregarPedido_DB, agregarPedidoDetalle_DB } from '../../DB/pedidoDB';
import { agregarVenta_DB } from '../../DB/ventaDB';

import { obtenerFechaHoy } from '../../Componentes/Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {

    direccionesCliente:[],

    pedidoUsuario:[],
    pedidoDetalles:[],

    datosConfirmacion:{},
    mostrarModalConfirmar:false
};

export class ConfirmarPedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerPedidoUsuario =()=> {
        let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
        pedidoUsuario = JSON.parse(pedidoUsuario);
        this.setState({pedidoUsuario});
    }

    obtenerDirecciones =()=> {
        const {usuarioAplicacion} = this.props;
        listarDirecciones_DB(usuarioAplicacion.codigoUsuario).then(lista=>{
            if(!lista.error){
                this.setState({direccionesCliente:lista});
            }else {console.log("ERROR >> LISTAR DIERCCIONES CLIENTE")}
        });

    }

    guardarDatosDireccion =()=> {
        agregarDireccion_DB().then();
    }

    controlModalConfirmar =()=> this.setState({mostrarModalConfirmar:!this.state.mostrarModalConfirmar});

    confirmarPedido =()=> {
        const { pedidoDetalles,ventasNegocios,datosConfirmacion } = this.state;
        agregarPedido_DB(datosConfirmacion).then(res=>{
            if(!res.error){
                var idPedido = (res[0][0].idPedido||"0");
                
                pedidoDetalles.forEach(detalle=>{
                    detalle["idPedido"] = idPedido;
                    agregarPedidoDetalle_DB(detalle);
                })

                ventasNegocios.forEach(venta=>{
                    venta["idPedido"] = idPedido;
                    agregarVenta_DB(venta);
                })
                this.setState({mostrarModalConfirmar:false},()=>{
                    this.props.cambiarPagina("compras")
                });
            } else {console.log("ERROR >> AGREGAR PEDIDO!!..",res.error);}
        });
    }

    confirmarDatos =(evento)=> {
        evento.preventDefault();
        const { pedidoUsuario } = this.state;
        // DETALLE DEL PEDIDO DEL CLIENTE
        var pedidoDetalles = [], totalPagar = 0;
        pedidoUsuario.forEach(p=>{
            console.log("Producto:", p);
            var detalle = {}
            detalle["idProducto"] = p.idProducto;
            detalle["idNegocio"] = p.idNegocio;
            detalle["cantidadProducto"] = (p.cantidadProducto||0);
            detalle["precioPorUnidad"] = (p.precioPorUnidad||0);
            totalPagar = totalPagar + p.precioPorUnidad;
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
        var direccionesCliente = document.getElementById('direccionesCliente');
        
        datosConfirmacion["tipoUsuario"] = (this.props.usuarioAplicacion.tipoUsuario||"");
        datosConfirmacion["codigoUsuario"] = (this.props.usuarioAplicacion.codigoUsuario||"");
        datosConfirmacion["idDireccion"] = direccionesCliente.options[direccionesCliente.selectedIndex].value;
        datosConfirmacion["telefonoReferencia"] = document.getElementById("telefonoReferencia").value;
        datosConfirmacion["correoReferencia"] = document.getElementById("correoReferencia").value;
        datosConfirmacion["totalProductos"] = pedidoUsuario.length;
        datosConfirmacion["totalPagar"] = totalPagar;
        datosConfirmacion["tipoPago"] = document.getElementById("tipoPago").value;
        datosConfirmacion["fechaRegistro"] = obtenerFechaHoy();
        datosConfirmacion["estadoPedido"] = "Registrado";
        


        // ABRIR MODAL DE CONFIRMARCION
        this.setState({pedidoDetalles,ventasNegocios,datosConfirmacion},()=> this.controlModalConfirmar() );
    }

    componentDidMount(){
        this.obtenerPedidoUsuario();
        this.obtenerDirecciones();
    }

    render(){
        return(
            <div className="ConfirmarPedidoCliente">
                <div className="Titulo">
                    <button>{"<"}</button>
                    <div>Mi Pedido</div>
                </div>
                <form className="confirmar_pedido" validate="true" onSubmit={this.confirmarDatos}>
                    <div className="confirmar_pedido_direccion">
                        <label>Direccion<hr/></label>
                        <div className="">
                            <select id="direccionesCliente">
                                {(this.state.direccionesCliente||[]).map(direccion=>
                                    <option key={direccion.idDireccion} value={direccion.idDireccion}>
                                        {direccion.denominacionDireccion}
                                    </option>
                                )}
                            </select>
                            <button>Cambiar</button>
                        </div>
                    </div>
                    <div className="confirmar_pedido_datos">                    
                        <label>Datos<hr/></label>
                        <div>                        
                            <input required type="email" id="correoReferencia" placeholder="Correo Referencia"/>
                            <input required type="text" id="telefonoReferencia" placeholder="Telefono Referencia"/>
                            <div className="">                                
                                <label><input type="radio" name="tipoPago" id="tipoPago" required/>Pago en Efectivo</label>
                                <label><input type="radio" name="tipoPago" required/>Pago con Tarjeta</label>
                            </div>
                        </div>
                    </div>
                    <div className="centrado">
                        <div className="confirmar_pedido_boton centrado">
                            <button type="submit"> Proceder al pago </button>
                        </div>
                    </div>
                </form>

                <Modal
                    mostrarModal={this.state.mostrarModalConfirmar}
                    controlModal={this.controlModalConfirmar}
                    tituloModal="CONFIRMAR PEDIDO"
                >
                    <div className="modal_confirmar">
                        <label> 
                            Recibira una llamada para confirmar el pedido,
                            <br/>al numero {(document.getElementById("telefonoReferencia")||{}).value}. 
                        </label>
                        <div> Productos en total: {this.state.datosConfirmacion.totalProductos}</div>
                        <div> Total a pagar: <b> S/. {this.state.datosConfirmacion.totalPagar}</b></div>
                        <div className="centrado">
                            <div className="modal_confirmar_boton">
                                <button onClick={()=>this.confirmarPedido()}> CONFIRMAR </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ConfirmarPedido;
