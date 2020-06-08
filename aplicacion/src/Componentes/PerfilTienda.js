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
import IconoGoogle from '../SVG/IconoGoogle';
import IconoAtras from '../SVG/aplicacion/IconoAtras';
import IconoAgregar from '../SVG/aplicacion/IconoAgregar';

/* VARIABLES GLOBALES */
const estadoInicial = {perfilTienda:{},
    paginaActual:1,
    cantidadPaginas:1,
    productosPorPagina:10,};

export class PiePagina extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
        this.abrirTabPerfilTienda.bind(this.abrirTabPerfilTienda)
    }

    componentDidMount(){
    console.log(this.props.match.params);
    const Tienda = {
        idTienda:this.props.match.params.idTienda,
        nombre:'nombre'
    }
    buscarPerfilTienda_DB(Tienda).then(res=>{
        console.log(res);
        this.setState({perfilTienda:res, archivoImagenTempo:res.logo},()=>{
            this.obtenerProductosTienda(res.codigoUsuario)
        })
    })

    }
    abrirTabPerfilTienda =(evt, tipoTab)=> {
        var i, tabcontent, tablinks;
      
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
      
        document.getElementById(tipoTab).style.display = "block";
        evt.currentTarget.className += " active";
      } 
      obtenerProductosTienda =(codigoUsuario)=> {
        const Buscador={
            codigoUsuario: codigoUsuario,
            inicio: 0,
            cantidad: 10
        };
        listarProductoPorTienda_DB(Buscador).then(res=>{
            console.log(res)
            if(!res.error){
                var cantidadPaginas = (res.cantidadProductos / this.state.productosPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas||1);
                this.setState({cantidadPaginas,productosTienda:res.listaProductos})
            } else { console.log("ERROR >> LISTAR PRODUCTOS DEL TIENDA!!..")}
        });
    } 

    buscarProductoTipo =()=> {
        const Buscador={
            tipo: this.props.match.params.tipo || "TODO",
            texto: "",
            inicio: (this.state.paginaActual-1)*this.state.productosPorPagina,
            cantidad: this.state.productosPorPagina
        };
        this.buscadorProducto(Buscador);
    }

    paginaSiguiente =()=> {
        const { paginaActual, cantidadPaginas } = this.state;
        if(paginaActual < cantidadPaginas){
            this.setState({paginaActual:paginaActual+1},()=> {
                this.buscarProductoTipo();
            });
        }
    }

    paginaAtras =()=> {
        const { paginaActual } = this.state;
        if(paginaActual>1){
            this.setState({paginaActual:paginaActual-1},()=> {
                this.buscarProductoTipo();
            });
        }
    }

    render() {
        return (
            <div className="PerfilTienda">
                <div class="tab">
                    <button class="tablinks" onClick={(event)=>this.abrirTabPerfilTienda(event, "ProductosPerfilTienda")}>Productos</button>
                    <button class="tablinks" onClick={(event)=>this.abrirTabPerfilTienda(event, "TiendaPerfilTienda")}>Tienda/Negocio</button>
                    <button class="tablinks" onClick={(event)=>this.abrirTabPerfilTienda(event, "ComentariosPerfilTienda")}>Comentarios</button>
                    </div>

                    <div id="TiendaPerfilTienda" class="tabcontent">
                    <h3>Nombre     :{this.state.perfilTienda.nombreTienda}</h3>
                    <div className="logo_tienda" style={{background:'url('+(this.state.archivoImagenTempo||"/img/clientes/sin_foto.jpg")+')no-repeat center/cover'}}>                            </div>
                    <h1></h1>
                    <h3>Categoria : Supermercados</h3>
                    <h3>Descripción: {this.state.perfilTienda.descripcionTienda}</h3>
                    </div>

                    <div id="ProductosPerfilTienda" class="tabcontent">
                    <h3>Productos</h3>
                    <div className="TiendaProductos">
                        <div className="usuario_encabezado">
                            <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                            <label> Mis Productos </label>
                            <div onClick={this.agregarProducto}><IconoAgregar fill="#23A24D"/></div>
                        </div>
                        {(this.state.productosTienda||[]).length > 0?
                        <div className="usuario_tabla centrado">
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
                        </div> :
                        
                        <div>No Hay Productos Registrados</div> }

                            </div>
                            </div>
                                            
                    <div id="ComentariosPerfilTienda" class="tabcontent">
                    <h3>Comentarios</h3>
                    <p>Comentario 1</p>
                    </div>
            </div>
        )
    }
}

export default PiePagina;