/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Paginado from '../../Componentes/Paginado';

/* FUNCIONES */
import { obtenerUsuario } from '../../Componentes/Funciones';
import { listarVentaNegocio_DB } from '../../DB/ventaDB';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:{},
    ventasNegocio:[],
    mostrarModalFechas:false,

    paginaActual:1,
    cantidadPaginas:1,
    ventasPorPagina:5,
};

export class NegocioVentas extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalFechas =()=> this.setState({mostrarModalFechas:!this.state.mostrarModalFechas})

    /* VENTAS */
    obtenerVentasNegocio =()=> {
        const Buscador={
            codigoUsuario:this.state.usuarioAplicacion.codigoUsuario,
            inicio: (this.state.paginaActual-1)*this.state.ventasPorPagina,
            cantidad: this.state.ventasPorPagina
        };

        listarVentaNegocio_DB(Buscador).then(res=>{
            if(!res.error){
                var cantidadPaginas = (res.cantidadVentas / this.state.ventasPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas||1);
                this.setState({cantidadPaginas,ventasNegocio:res.listaVentas})
            } else { console.log("ERROR >> LISTAR PEDIDOS NEGOCIO"); }
        });
    }

    /****  P A G I N A D O  ****/
    paginaSiguiente =()=> {
        const { paginaActual, cantidadPaginas } = this.state;
        if(paginaActual < cantidadPaginas){
            this.setState({paginaActual:paginaActual+1},()=> {
                this.obtenerVentasNegocio();
            });
        }
    }

    paginaAtras =()=> {
        const { paginaActual } = this.state;
        if(paginaActual>1){
            this.setState({paginaActual:paginaActual-1},()=> {
                this.obtenerVentasNegocio();
            });
        }
    }

    iniciarFunciones =()=> {
        this.obtenerVentasNegocio();
    }

    componentDidMount(){
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){ this.setState({usuarioAplicacion},()=>this.iniciarFunciones()) }
    }
    
    render(){
        return(
            <div className="NegocioVentas">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Mis Ventas </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
                
                {(this.state.ventasNegocio||[]).length > 0?
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
                                <th> CLIENTE </th>
                            </tr>
                        </thead>
                        {(this.state.ventasNegocio||[]).map((venta,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td style={{textAlign:'center'}}>
                                        N° <b>{venta.idVenta}</b><br/>
                                        <b>S/. {venta.totalPagar.toFixed(2)}</b><br/>
                                        Cant: {venta.totalProductos}<br/>
                                        {(venta.fechaRegistro||"").split(" ")[0]}<br/>
                                        <b>{venta.estadoPedido.toUpperCase()}</b><br/>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        Cliente: {venta.nombreCompleto+" "+venta.apellidoPaterno}<br/>
                                        <b>{venta.denominacionDireccion}</b><br/>
                                        {venta.referenciaDireccion}<br/>
                                        Email: {venta.correoReferencia}<br/>
                                        Teléfono: {venta.telefonoReferencia}
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
                <div> No Existen Ventas Registradas</div>}
            </div>
        )
    }
}

export default NegocioVentas;
