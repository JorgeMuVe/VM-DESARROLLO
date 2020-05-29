/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';
import Paginado from '../../Componentes/Paginado';

import { obtenerUsuario } from '../../Componentes/Funciones';
import { listarPedidoNegocio_DB } from '../../DB/pedidoDB';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
let map;
const estadoInicial = {
    usuarioAplicacion:{},

    mostrarModalMapa:false,
    mostrarModalFechas:false,
    pedidosNegocio:[],

    paginaActual:1,
    cantidadPaginas:1,
    pedidosPorPagina:5,
};

export class NegocioPedidos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas})
    controlModalMapa =()=> this.setState({mostrarModalMapa:!this.state.mostrarModalMapa})

      /* PEDIDOS */
    obtenerPedidosNegocio =()=> {
        const Buscador={
            codigoUsuario:this.state.usuarioAplicacion.codigoUsuario,
            inicio: (this.state.paginaActual-1)*this.state.pedidosPorPagina,
            cantidad: this.state.pedidosPorPagina
        };
        listarPedidoNegocio_DB(Buscador).then(res=>{
            if(!res.error){
                var cantidadPaginas = (res.cantidadPedidos / this.state.pedidosPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas||1);
                this.setState({cantidadPaginas,pedidosNegocio:res.listaPedidos})
            } else { console.log("ERROR >> LISTAR PEDIDOS NEGOCIO"); }
        });
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

    /****  P A G I N A D O  ****/
    paginaSiguiente =()=> {
        const { paginaActual, cantidadPaginas } = this.state;
        if(paginaActual < cantidadPaginas){
            this.setState({paginaActual:paginaActual+1},()=> {
                this.obtenerPedidosNegocio();
            });
        }
    }

    paginaAtras =()=> {
        const { paginaActual } = this.state;
        if(paginaActual>1){
            this.setState({paginaActual:paginaActual-1},()=> {
                this.obtenerPedidosNegocio();
            });
        }
    }

    iniciarFunciones =()=> {
        this.obtenerPedidosNegocio()
    }

    componentDidMount(){
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){ this.setState({usuarioAplicacion},()=>this.iniciarFunciones()) }
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
                    <div className="usuario_tabla_paginado">
                        <Paginado
                            paginaActual={this.state.paginaActual}
                            cantidadPaginas={this.state.cantidadPaginas}
                            paginaSiguiente={this.paginaSiguiente}
                            paginaAtras={this.paginaAtras}
                        />
                    </div>
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
                                        <b>S/. {parseFloat(pedido.totalPagar).toFixed(2)}</b><br/>
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
                        <Paginado
                            paginaActual={this.state.paginaActual}
                            cantidadPaginas={this.state.cantidadPaginas}
                            paginaSiguiente={this.paginaSiguiente}
                            paginaAtras={this.paginaAtras}
                        />
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
