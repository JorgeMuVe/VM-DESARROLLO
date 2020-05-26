/*
-- Description:      Pantalla de Producto de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  C O M P O N E N T E S   ***/
import React from 'react';
import Paginado from '../../Componentes/Paginado';

/***  I C O N O   S V G  ***/
import IconoLupa from '../../SVG/IconoLupa';

/***   F U N C I O N E S  ***/
import { buscarProducto_DB } from '../../DB/productoDB';
import { unidadMedidaProducto } from '../../Componentes/Funciones';

/***  V A R I A B L E S   G L O B A L E S  ***/
const estadoInicial = {
    listaProductos:[],
    productoSeleccionado:{},

    paginaActual:1,
    cantidadPaginas:1,
    productosPorPagina:10,
};

export class ProductoLista extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    
    calcularPrecioProducto =(producto)=> {
        return <b>S/: {
            parseFloat(producto.precioPorUnidad||0).toFixed(2)+" x "+
            unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)+
            (producto.descuentoUnidad>0?(" (-"+producto.descuentoUnidad+"%)"):"")}</b>
    }

    /****  B U S Q U E D A   ****/
    buscadorProducto =(Buscador)=> {
        buscarProducto_DB(Buscador).then(res=>{  
            var cantidadPaginas = (res.cantidadProductos / this.state.productosPorPagina);
            cantidadPaginas = Math.ceil(cantidadPaginas||1);
            if(!res.error){
                this.setState({cantidadPaginas,listaProductos:res.listaProductos
            })}
        });
    }

    buscarProductoTipo =()=> {
        const Buscador={
            tipo: this.props.match.params.tipo || "TODO",
            texto: document.getElementById("textoBuscar").value || "_",
            inicio: (this.state.paginaActual-1)*this.state.productosPorPagina,
            productos: this.state.productosPorPagina
        };
        this.props.history.push("/productos/buscador/"+Buscador.tipo+"/"+Buscador.texto);
        this.buscadorProducto(Buscador);
    }

    buscarProductoInicial =()=> {
        const {tipo,texto} = this.props.match.params;
        const Buscador={
            tipo: tipo||"TODO",texto:texto==="_"?"":texto,
            inicio: (this.state.paginaActual-1)*this.state.productosPorPagina,
            productos: this.state.productosPorPagina
        };
        this.buscadorProducto(Buscador);
    }

    buscadorProductoBoton =(evento)=> {
        evento.preventDefault();
        this.setState({paginaActual:1},()=>{
            this.buscarProductoTipo();
        });
    }

    /****  P A G I N A D O  ****/
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

    /****   I N I C A R   F U N C I O N E S   ****/
    inicarFuniones =()=> {
        this.buscarProductoInicial();
    }

    componentDidMount() {
        this.inicarFuniones();
    }

    render(){
        return(
        <div className="ProductoBuscador">
            <div className="centrado">
                <div className="producto_buscador">

                    <form className="principal_buscador_cuadro" style={{margin:"1px",padding:"2px"}} noValidate onSubmit={this.buscadorProductoBoton}>
                        <div className="centrado"><IconoLupa/></div>
                        <input type="text" id="textoBuscar" placeholder="Busca tu producto"/>
                        <button type="submit">BUSCAR</button>
                    </form>

                    <div className="centrado">
                        <Paginado
                            paginaActual={this.state.paginaActual}
                            cantidadPaginas={this.state.cantidadPaginas}
                            paginaSiguiente={this.paginaSiguiente}
                            paginaAtras={this.paginaAtras}
                        />
                    </div>

                    <div className="centrado">
                        {(this.state.listaProductos||[]).length > 0?
                        <div className="producto_buscador_lista">
                            {(this.state.listaProductos||[]).map(producto =>
                                <div className="producto_buscador_lista_item" style={{background:"url("+producto.imagenProducto+")no-repeat center/cover"}} key={producto.idProducto}>
                                    <div className="producto_buscador_lista_item_datos" onClick={()=>this.props.seleccionarProductoCantidad(producto)}>
                                        <span>{(producto.nombreProducto||"").toUpperCase()}</span>
                                        <span>{producto.nombreNegocio}</span>
                                        <span>Precio:{this.calcularPrecioProducto(producto)}</span>
                                    </div>
                                </div>
                            )}
                        </div> :
                        <div>No se encontraron Productos!!..</div> }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ProductoLista;
