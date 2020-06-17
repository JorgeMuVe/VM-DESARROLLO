/*
-- Description:      PIE DE PAGINA DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import {buscarPerfilTienda_DB} from '../DB/tiendaDB'
import {listarProductoPorTienda_DB} from '../DB/productoDB'
import Paginado from '../Componentes/Paginado';
/* ICONOS */
import IconoAtras from '../SVG/aplicacion/IconoAtras';
import IconoGoogle from '../SVG/IconoGoogle';
/* VARIABLES GLOBALES */
const estadoInicial = {
    perfilTienda:{},
    paginaActual:1,
    cantidadPaginas:1,
    productosPorPagina:10,
    tabActivo:"perfil"
};

export class PiePagina extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    obtenerProductosTienda =()=> {
        const Buscador={
            codigoUsuario: this.state.perfilTienda.codigoUsuario,
            inicio: (this.state.paginaActual-1)*this.state.productosPorPagina,
            cantidad: this.state.productosPorPagina
        };
        listarProductoPorTienda_DB(Buscador).then(res=>{
            if(!res.error){
                var cantidadPaginas = (res.cantidadProductos / this.state.productosPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas||1);
                this.setState({cantidadPaginas,productosTienda:res.listaProductos})
            } else { console.log("ERROR >> LISTAR PRODUCTOS DEL TIENDA!!..")}
        });
    }

    paginaSiguiente =()=> {
        const { paginaActual, cantidadPaginas } = this.state;
        if(paginaActual < cantidadPaginas){
            this.setState({paginaActual:paginaActual+1},()=> {
                this.obtenerProductosTienda();
            });
        }
    }

    paginaAtras =()=> {
        const { paginaActual } = this.state;
        if(paginaActual>1){
            this.setState({paginaActual:paginaActual-1},()=> {
                this.obtenerProductosTienda();
            });
        }
    }

    mostrarTabTienda =(tabActivo)=> this.setState({tabActivo})

    componentDidMount(){
        const Tienda = { idTienda:this.props.match.params.idTienda }
        buscarPerfilTienda_DB(Tienda).then(res=>{
            this.setState({perfilTienda:res, archivoImagenTempo:res.logo},()=>{
                this.obtenerProductosTienda()
            })
        })
    }

    render() {
        return (
            <div className="PerfilTienda">
                <div className="perfilBox">
                <div className="tab">
                    <a href="##">
                        <div className="centrado">
                            <IconoGoogle fill="#d1d3d8"/>
                        </div>
                        <button className={this.state.tabActivo==="productos"?"tablinks active":"tablinks"} onClick={()=>this.mostrarTabTienda("productos")}>Productos</button>
                    </a>

                    <a href="##">
                        <div className="centrado">
                            <IconoGoogle fill="#d1d3d8"/>
                        </div>
                    <button className={this.state.tabActivo==="perfil"?"tablinks active":"tablinks"} onClick={()=>this.mostrarTabTienda("perfil")}>Tienda/Negocio</button>
                    </a>
                    
                    
                    <button hidden={true} className={this.state.tabActivo==="comentarios"?"tablinks active":"tablinks"} onClick={()=>this.mostrarTabTienda("comentarios")}>Comentarios</button>
                    
                </div>

                <div className="usuario_encabezado">
                    <div className="iconoRegresar">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    </div>
                    <label> {this.state.perfilTienda.nombreTienda} </label>
                    <div></div>
                </div>

                <div id="ProductosPerfilTienda" className={this.state.tabActivo==="productos"?"tabcontent":"ocultar"}>
                    <h3 className="centrado">Productos</h3>
                    <div className="TiendaProductos">    
                        {(this.state.productosTienda||[]).length > 0?
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
                                        <th> PRODUCTO </th>
                                        <th> PRECIO<br/>UNIDAD</th>
                                    </tr>
                                </thead>
                                {(this.state.productosTienda||[]).map((producto,i) => {
                                    return ( 
                                    <tbody key={i}>
                                        <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.props.seleccionarProductoCantidad(producto)}>
                                            <td> 
                                                {producto.nombreTipoProducto}<br/>
                                                {producto.nombreProducto}
                                            </td>
                                            <td style={{textAlign:'center'}}>
                                                S/. {producto.precioPorUnidad} x {producto.unidadCantidad +" "+producto.tipoUnidad}
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
                        </div>
                        :
                        <div>No Hay Productos Registrados</div> }
                    </div>
                </div>  
                <li id="TiendaPerfilTienda" className={this.state.tabActivo==="perfil"?"tabcontent":"ocultar"}>  
                    
                    <h3 className="centrado">Nombre     :{this.state.perfilTienda.nombreTienda}</h3>
                    <div className="centrado">
                    <div className="logo_tienda" style={{background:'url('+(this.state.perfilTienda.logo||"/img/tiendas/sin_foto.jpg")+')no-repeat center/cover'}}></div>
                    </div>
                    <h3 className="centrado">Categoria : Supermercados</h3>
                    <h3 className="centrado">Descripción: {this.state.perfilTienda.descripcionTienda}</h3>
                </li>
                <div id="ComentariosPerfilTienda" className={this.state.tabActivo==="comentarios"?"tabcontent":"ocultar"}>
                    <h3>Comentarios</h3>
                    <p>Comentario 1</p>
                </div>
                </div>
            </div>
        )
    }
}

export default PiePagina;