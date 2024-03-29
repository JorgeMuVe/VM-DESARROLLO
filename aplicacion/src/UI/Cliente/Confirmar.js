/*
-- Description:     PAGINA DE CONFIRMACION DE PEDIDO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/* ICONOS SVG */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/***  F U N C I O N E S  ***/
import { agregarVenta_DB } from '../../DB/ventaDB';
import { agregarPedido_DB } from '../../DB/pedidoDB';
import { agregarPedidoDetalle_DB } from '../../DB/detalleDB';
import { obtenerFechaHoy,obtenerUsuario } from '../../Componentes/Funciones';
import { listaDirecciones_DB, agregarDireccion_DB } from '../../DB/direccionDB';

/* VARIABLES GLOBALES */
const estadoInicial = {

    direccionesCliente:[],

    ventasTiendas:[],

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

    calcularTotalPagar =()=> {
        var totalPagar = 0;
        (this.state.pedidoUsuario||[]).forEach(producto => {
            var precioProducto = parseFloat(producto.precioPorUnidad) * parseFloat(producto.cantidadProducto);
            var descuentoUnidad = producto.descuentoUnidad/100;
            var precio = parseFloat(precioProducto-(precioProducto*descuentoUnidad)||0);
            totalPagar = totalPagar + precio;
        });
        return totalPagar.toFixed(2);
    }

    obtenerPedidoUsuario =()=> {
        let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
        pedidoUsuario = JSON.parse(pedidoUsuario);
        this.setState({pedidoUsuario});
    }

    obtenerDirecciones =(usuarioAplicacion)=> {
        listaDirecciones_DB({codigoUsuario : usuarioAplicacion.codigoUsuario}).then(lista=>{
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
        const { pedidoDetalles,ventasTiendas,datosConfirmacion } = this.state;
        agregarPedido_DB(datosConfirmacion).then(res=>{
            if(!res.error){
                var idPedido = (res.idPedido||"0");
                
                pedidoDetalles.forEach(detalle=>{
                    detalle["idPedido"] = idPedido;
                    agregarPedidoDetalle_DB(detalle)
                })

                ventasTiendas.forEach(venta=>{
                    venta["idPedido"] = idPedido;
                    agregarVenta_DB(venta)
                })

                this.setState({mostrarModalConfirmar:false},()=>{
                    sessionStorage.removeItem('pedidoUsuario');
                    this.props.confirmarPedido();
                    this.props.history.push("/usuario/cliente/compras")
                });
            } else {console.log("ERROR >> AGREGAR PEDIDO!!..",res.error);}
        });
    }

    confirmarDatos =(evento)=> {
        evento.preventDefault();
        const { pedidoUsuario } = this.state;
        const usuarioAplicacion = obtenerUsuario();

        // DETALLE DEL PEDIDO DEL CLIENTE
        var pedidoDetalles = [];
        pedidoUsuario.forEach(p=>{
            var detalle = {}
            detalle["idProducto"] = p.idProducto;
            detalle["idTienda"] = p.idTienda;
            detalle["cantidadProducto"] = (p.cantidadProducto||0);
            detalle["precioPorUnidad"] = (p.precioPorUnidad||0);
            pedidoDetalles.push(detalle);
        });
        
        // REGISTRO DE VENTA A TIENDAS
        var ventasTiendas = [];
        pedidoUsuario.forEach(p=>{ 
            var existeTienda = false;
            ventasTiendas.forEach(n=>{if(n.idTienda===p.idTienda){ existeTienda=true } })
            if(!existeTienda){ ventasTiendas.push({idTienda:p.idTienda}) }
        });

        // DATOS EN GENERAL DEL PEDIDO DE CLIENTE
        var datosConfirmacion = {};
        var direccionesCliente = document.getElementById('direccionesCliente');
        
        datosConfirmacion["tipoUsuario"] = (usuarioAplicacion.tipoUsuario||"");
        datosConfirmacion["codigoUsuario"] = (usuarioAplicacion.codigoUsuario||"");
        datosConfirmacion["idDireccion"] = direccionesCliente.options[direccionesCliente.selectedIndex].value;
        datosConfirmacion["telefonoReferencia"] = document.getElementById("telefonoReferencia").value;
        datosConfirmacion["correoReferencia"] = document.getElementById("correoReferencia").value;
        datosConfirmacion["totalProductos"] = pedidoUsuario.length;
        datosConfirmacion["totalPagar"] = this.calcularTotalPagar();
        datosConfirmacion["tipoPago"] = document.getElementById("tipoPago").value;
        datosConfirmacion["fechaRegistro"] = obtenerFechaHoy();
        datosConfirmacion["estadoPedido"] = "Registrado";
        


        // ABRIR MODAL DE CONFIRMARCION
        this.setState({pedidoDetalles,ventasTiendas,datosConfirmacion},()=> this.controlModalConfirmar() );
    }

    componentDidMount(){
        
        const usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){
            this.obtenerPedidoUsuario();
            this.obtenerDirecciones(usuarioAplicacion);
        } else{this.props.history.push('/')}
    }

    render(){
        return(
            <div className="ConfirmarPedidoCliente">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mi Pedido </label>
                    <div onClick={this.props.history.goBack}></div>
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
