/***  C O M P O N E N T E S   ***/
import React from 'react';
import Paginado from '../../Componentes/Paginado';

/***   F U N C I O N E S  ***/
import { buscarProducto_DB } from '../../DB/productoDB';
import { unidadMedidaProducto } from '../../Componentes/Funciones';

/***  V A R I A B L E S   G L O B A L E S  ***/
const estadoInicial = {
    listaProductos:[],
    productoSeleccionado:{},

    paginaActual:1,
    cantidadPaginas:1,
    productosPorPagina:12,
};

export class ProductoBuscador extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    
    calcularPrecioProducto =(producto)=> {
        return <b>S/. {
            parseFloat(producto.precioPorUnidad||0).toFixed(2)+" x "+
            unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)}</b>
    }

    /****  B U S Q U E D A   ****/
    buscadorProducto =(Buscador)=> {
        buscarProducto_DB(Buscador).then(res=>{
            if(!res.error){
                var cantidadPaginas = (res[0].cantidadProductos / this.state.productosPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas||1);
                this.setState({cantidadPaginas,listaProductos:res})
            }else { this.setState({cantidadPaginas:1,listaProductos:[]}) }
        });
    }

    buscarProductoTipo =()=> {
        const {ciudad,tipo,id} = this.props.match.params;
        const Buscador={
            ciudad1:ciudad,ciudad:"cusco",tipo: tipo||"TODO",
            texto: document.getElementById("textoBuscar").value||"_",id:id||0,
            inicio: (this.state.paginaActual-1)*this.state.productosPorPagina,
            cantidad: this.state.productosPorPagina
        };
        //this.props.history.push("/productos/buscador/"+Buscador.ciudad+"/"+Buscador.tipo+"/"+id+"/"+Buscador.texto);
        window.history.href="/productos/buscador/"+Buscador.ciudad+"/"+Buscador.tipo+"/"+id+"/"+Buscador.texto
        this.buscadorProducto(Buscador);
    }

    buscarProductoInicial =()=> {
        const {ciudad,tipo,id,texto} = this.props.match.params;
        document.getElementById("textoBuscar").value = texto==="_"?"":texto;
        const Buscador={
            ciudad: ciudad||"cusco", tipo: tipo||"TODO", texto:texto==="_"?"":texto,id:id||0,
            inicio: (this.state.paginaActual-1)*this.state.productosPorPagina,
            cantidad: this.state.productosPorPagina
        };
        this.buscadorProducto(Buscador);
    }

    buscadorProductoBoton =(evento)=> {
        evento.preventDefault();
        this.setState({paginaActual:1},()=>{
            this.buscarProductoTipo();
        });
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
                        <div className="centrar_lista">
                            <div className="lista_DiseñoProductos no-seleccionable">
                                {(this.state.listaProductos || []).map((Dprod, i) =>
                                    <div className="lista_DiseñoProductos_item" key={i} onClick={()=>this.props.seleccionarProductoCantidad(Dprod)}>
                                        <div className="DiseñoProductos_item_imagen">
                                            <img className="imagenR" alt="Imagen Producto" width="255px" height="193px" src={Dprod.imagenProducto}></img>
                                        </div>
                                        <div className="DiseñoProductos_item_datos">
                                            <h4 className="Dprod_nombreProducto">{Dprod.nombreProducto}</h4>
                                            <h4 className="Dprod_descripcionProducto">{Dprod.detalleProducto}</h4>
                                            <h5 className="Dprod_Negocio">{Dprod.nombreTienda}</h5>
                                            <h3 className="Dprod_precio">{this.calcularPrecioProducto(Dprod)}</h3>
                                            {Dprod.descuentoUnidad<0?null:
                                            <div className="centrado Dprod_descuento">-{Dprod.descuentoUnidad}%</div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>:
                        <div>No se encontraron Productos!!..</div> }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ProductoBuscador;

/*

import IconoLupa from '../../SVG/IconoLupa';

<form hidden="true" className="principal_buscador_cuadro" style={{margin:"1px",padding:"2px"}} noValidate onSubmit={this.buscadorProductoBoton}>
    <div className="centrado"><IconoLupa/></div>
    <input type="text" id="textoBuscar" placeholder="Busca tu producto"/>
    <button type="submit">BUSCAR</button>
</form>

*/
