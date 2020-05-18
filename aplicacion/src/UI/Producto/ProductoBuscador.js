/*
-- Description:      Pantalla de Producto de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/***  C O M P O N E N T E S   ***/
import React from 'react';
import Modal from '../../Componentes/Modal';

/***  I C O N O   S V G  ***/
import IconoLupa from '../../SVG/IconoLupa';

/***   F U N C I O N E S  ***/
import { buscarProducto_DB } from '../../DB/productoDB';
import { unidadMedidaProducto } from '../../Componentes/Funciones';

/***  V A R I A B L E S   G L O B A L E S  ***/
const estadoInicial = {
    listaProductos:[],
    mostrarModalCantidad:false
};

export class ProductoLista extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    /****  B U S Q U E D A   ****/
    buscadorProducto =(Buscador)=> {
        buscarProducto_DB(Buscador).then(lista=>{
            if(!lista.error){ this.setState({ listaProductos: lista })}
        });
    }

    buscarProductoTipo =(evento)=> {
        evento.preventDefault();
        var texto = document.getElementById("textoBuscar").value;
        const {tipo} = this.props.match.params;
        const Buscador={tipo,texto};
        this.buscadorProducto(Buscador);
    }

    buscarProductoInicial =()=> {
        const {tipo,texto} = this.props.match.params;
        const Buscador={tipo,texto};
        this.buscadorProducto(Buscador);
    }

    /***   A G R E G A R   P R O D U C T O    ***/
    controlModalCantidad =()=> this.setState({mostrarModalCantidad:!this.state.mostrarModalCantidad});

    agregarCantidadProducto =(evento)=> {
        evento.preventDefault();
        //this.props.agregarCanasta(producto)
        var cantidadProducto = document.getElementById("cantidadProducto").value;
        console.log("Cantidad:__", cantidadProducto);
        //this.props.agregarCanasta(producto)
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

                    <form className="principal_buscador_cuadro" style={{margin:"1px",padding:"2px"}} noValidate onSubmit={this.buscarProductoTipo}>
                        <div className="centrado"><IconoLupa/></div>
                        <input type="text" id="textoBuscar" placeholder="Nombre del Producto"/>
                        <button type="submit">BUSCAR</button>
                    </form>

                    <div className="producto_buscador_paginacion">
                        <input type="button" value="<"/>
                        <input type="text" defaultValue="1/100"/>
                        <input type="button" value=">"/>
                    </div>
                    
                    <div className="centrado">
                        {(this.state.listaProductos||[]).length > 0?
                        <div className="producto_buscador_lista">
                            {(this.state.listaProductos||[]).map(producto =>
                                <div className="producto_buscador_lista_item" style={{background:"url(/img/fondos/verduras.jpg)"}} key={producto.idProducto}>
                                    <div className="producto_buscador_lista_item_datos">
                                        <div>
                                            <label><b>{producto.nombreTipoProducto+" "+producto.nombreProducto}</b></label>
                                            <label>
                                                Precio: S/: {parseFloat(producto.precioPorUnidad||0).toFixed(2) + " x " + unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)}
                                                <b> - Disponible:  </b> {"5 KG"} <b> Tienda:  </b>{producto.nombreNegocio}
                                            </label>
                                            <label> Description -> (Más Información!...)</label>
                                        </div>
                                        <button onClick={()=>this.controlModalCantidad()}> + </button>
                                    </div>
                                </div>
                            )}
                        </div> :
                        <div>No se encontraron Productos!!..</div> }
                    </div>
                </div>
            </div>
            <Modal
                controlMolda={this.controlModalCantidad}
                mostrarModal={this.state.mostrarModalCantidad}
                titulo="Cantidad de Producto"
            >
                Agregar Cantidad de Producto
                <input type="number" placeholder="Cantidad" id="cantidadProducto"/>
                <button onClick={this.agregarCantidadProducto}> AGREGAR </button>
            </Modal>
        </div>
        )
    }
}

export default ProductoLista;
