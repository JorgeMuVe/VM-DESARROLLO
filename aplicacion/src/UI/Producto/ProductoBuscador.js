/*
-- Description:      Pantalla de Producto de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import IconoLupa from '../../SVG/IconoLupa';
import { unidadMedidaProducto } from '../../Componentes/Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class ProductoLista extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    buscarProducto =()=> {
        var productoBusqueda = document.getElementById("productoBusqueda").value;
        console.log(productoBusqueda);
    }

    componentDidMount(){
        console.log(this.props.buscarPor);
    }


    render(){
        if(this.props.buscarPor){
            return(
            <div className="ProductoBuscador">
                <div className="centrado">
                    <div className="producto_buscador">

                        <form className="principal_buscador_cuadro" style={{margin:"1px",padding:"2px"}} noValidate onSubmit={this.buscarProducto}>
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
                            <div className="producto_buscador_lista">
                                {(this.props.productos||[1,2,3,4,5]).map(producto =>
                                    <div className="producto_buscador_lista_item" style={{background:"url(/img/fondos/verduras.jpg)"}} key={producto.idProducto}>
                                        <div className="producto_buscador_lista_item_datos">
                                            <div>
                                                <label><b>Producto {producto.nombreProducto}</b></label>
                                                <label>
                                                    Precio: S/: {parseFloat(producto.precioPorUnidad||0).toFixed(2) + " x " + unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)}
                                                    <b> - Disponible:  </b> {"5 KG"} <b> Tienda:  </b>{producto.nombreNegocio}
                                                </label>
                                                <label> Description -> (Más Información!...)</label>
                                            </div>
                                            <button onClick={()=>this.props.agregarCanasta(producto)}> + </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }else { return null }
    }
}

export default ProductoLista;
