/*
-- Description:      Pantalla de Pedidos de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {
};

export class Pedido extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    
    calcularPrecio =(precio,cantidad)=> {
        var precioGramo = (precio/1000);
        var precioCalculado = cantidad * precioGramo;
        return precioCalculado;
    }

    componentDidMount(){
    }
    render(){
        if(this.props.paginaActual==="pedido"){
            return(
                <div className="Pedido">
                    <div className="centrado">
                        <div className="pedido_encabezado">
                            <button onClick={()=>this.props.cambiarPagina("producto-cliente")}>{"<"}</button>
                            <div> {"Mi PEDIDO"} </div>
                        </div>
                    </div>
                    <div className={"producto_lista " + (this.state.mostrarDatos?"ocultar":"")}>
                        {(this.props.pedidoUsuario||[]).map(producto => {
                            return(
                            <div className="producto_item" key={producto.id}>
                                <img src={producto.src} alt={producto.nombre}/>
                                <div className="producto_item_datos">
                                    <label>
                                        <div style={{fontSize:"3vh"}}><b>{producto.nombre}</b><br/></div>
                                        <div style={{fontSize:"2.5vh"}}>Precio: <b>( S/. {this.calcularPrecio(producto.precio,producto.reserva).toFixed(2)} ) </b>
                                            X {producto.reserva+" "+producto.unidad} 
                                        <br/></div>
                                        <div style={{fontSize:"2.5vh"}}><b> Tienda:  </b>{producto.tienda}</div>   
                                        <div style={{fontSize:"2vh"}}>Description -> (Más Información!...)</div>
                                    </label>
                                    <button onClick={()=>this.props.sacarProducto(producto)}>-</button>
                                </div>
                            </div>
                        )})}  
                    </div>
                    <div 
                        className={"pedido_siguiente " + (this.state.mostrarDatos?"ocultar":"")}>
                        <button onClick={()=>this.mostarDatosUsuario()}>{"Comprar"}</button>       
                    </div>
                    <div className={"pedido_datos " + (this.state.mostrarDatos?"":"ocultar")}>
                        <div className="usuario_direccion">
                            <div className="item_direccion">
                                <div className="tipo_direccion">Casa</div>
                                <div className="tipo_direccion">San Jeronimo Calle Rodriguez Pastor 475</div>
                                <div className="tipo_direccion">Cerca a edficio de Telefonica</div>
                            </div>
                            <div className="eliminar_direccion">
                                <button onClick={()=>this.eliminarDireccion}>X</button>
                            </div>
                        </div>
                        <div className="usuario_datos">
                            <input type="text" placeholder="Telefono Referencia"/>
                            <input type="text" placeholder="Correo Referencia"/>
                        </div>
                    </div>
                    <div className={"pedido_pago " + (this.state.mostrarDatos?"":"ocultar")}>
                        <div className="tipo_pago">
                            <label><input type="checkbox"/>Pago en Efectivo</label>
                            <label><input type="checkbox"/>Pago con Tarjeta</label>
                        </div>
                        <div className={(this.props.pedidoUsuario||[]).length>0 ? "pedido_siguiente":"ocultar"}>
                            <button onClick={()=>this.mostarDatosUsuario()}>Pagar</button>
                        </div>
                    </div>
                </div>
            )
        } else { return null; } 
    }
}

export default Pedido;
