/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { obtenerUsuario } from '../../Componentes/Funciones';
import { listarVentaNegocio_DB } from '../../DB/ventaDB';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

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

    /* VENTAS */
    obtenerVentasNegocio =(codigoUsuario)=> {
        listarVentaNegocio_DB({codigoUsuario}).then(ventas=>{
            if(ventas[0]){
                if(!ventas[0].error){ this.setState({ ventasNegocio: ventas[0] }) } 
                //else { console.log("ERROR >> LISTAR VENTAS NEGOCIO"); }
            } //else { console.log("ERROR >> LISTAR VENTAS NEGOCIO"); }
        });
    }

    componentDidMount(){ 
        var usuarioAplicacion = obtenerUsuario();
        this.obtenerVentasNegocio(usuarioAplicacion.codigoUsuario);
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
                        Paginado
                    </div>
                </div> :
                <div> No Existen Ventas Registradas</div>}
            </div>
        )
    }
}

export default NegocioVentas;
