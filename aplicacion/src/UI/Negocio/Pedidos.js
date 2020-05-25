/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';
import { obtenerUsuario } from '../../Componentes/Funciones';
import { listarPedidoNegocio_DB } from '../../DB/pedidoDB';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
let map;
const estadoInicial = {
    mostrarModalMapa:false,
    mostrarModalFechas:false,
    pedidosNegocio:[],
};

export class NegocioPedidos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas})
    controlModalMapa =()=> this.setState({mostrarModalMapa:!this.state.mostrarModalMapa})

      /* PEDIDOS */
    obtenerPedidosNegocio =(codigoUsuario)=> {
        if(codigoUsuario){
            listarPedidoNegocio_DB({codigoUsuario}).then(pedidos=>{
                if(pedidos[0]){
                    if(!pedidos[0].error){
                        this.setState({ pedidosNegocio: pedidos[0] });
                    } else { console.log("ERROR >> LISTAR PEDIDOS NEGOCIO"); }
                } else { console.log("ERROR >> LISTAR PEDIDOS NEGOCIO"); }
            });
        }
    }

    abrirMapaPedidos =()=>{
        this.controlModalMapa();
        setTimeout(this.mostrarMapa,100);
    }

    mostrarMapa =()=> {
        map = new window.google.maps.Map(document.getElementById('map'),{
            center: new window.google.maps.LatLng(-13.537623654609476,-71.90437483693309),
            zoom: 14, mapTypeId: 'roadmap'
        });

        const {pedidosNegocio} = this.state;
        (pedidosNegocio||[]).forEach(pedido=>{
            var position = {
                lat: parseFloat(pedido.lat || -13.537623654609476),
                lng: parseFloat(pedido.lng || -71.90437483693309) 
            };
            var mark = new window.google.maps.Marker({position});
            mark.setMap(map);
        });

    }

    componentDidMount(){
        var usuarioAplicacion = obtenerUsuario();
        this.obtenerPedidosNegocio(usuarioAplicacion.codigoUsuario);

    }
    
    render(){
        return(
            <div className="NegocioPedidos">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Pedidos </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
                <div className="usuario_encabezado_opciones">
                    <a href="#map" onClick={()=>this.abrirMapaPedidos()} >
                        Mostrar Mapa de Pedidos
                    </a>
                </div>
                
                {(this.state.pedidosNegocio||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>
                                <th> PEDIDO</th>
                                <th> REFERENCIA </th>
                            </tr>
                        </thead>
                        {(this.state.pedidosNegocio||[]).map((pedido,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td style={{textAlign:'center'}}>
                                        N° <b>{pedido.idPedido}</b><br/>
                                        <b>S/. {pedido.totalPagar.toFixed(2)}</b><br/>
                                        Cant: {pedido.totalProductos}<br/>
                                        {(pedido.fechaRegistro||"").split(" ")[0]}<br/>
                                        <b>{pedido.estadoPedido.toUpperCase()}</b><br/>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        Cliente: {pedido.nombreCompleto+" "+pedido.apellidoPaterno}<br/>
                                        <b>{pedido.denominacionDireccion}</b><br/>
                                        {pedido.referenciaDireccion}<br/>
                                        Email: {pedido.correoReferencia}<br/>
                                        Teléfono: {pedido.telefonoReferencia}
                                    </td>
                                </tr> 
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        Paginado
                    </div>
                </div> :
                <div> No Existen Pedidos Registradas</div>}
                <Modal
                    controlModal={this.controlModalMapa}
                    mostrarModal={this.state.mostrarModalMapa}
                    tituloModal="Mapa de Pedidos"
                >
                    <div className="negocio_pedido_mapa" id="map"></div>
                </Modal>
            </div>
        )
    }
}

export default NegocioPedidos;
