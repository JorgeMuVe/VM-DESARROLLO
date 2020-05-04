/*
-- Description:      Pantalla de Producto de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
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

    render(){
        if(this.props.tipoProducto){
            return(
                <div className="Producto">
                    <div className="centrado">
                        <div className="productos_encabezado">                    
                            <button onClick={()=>this.props.cambiarPagina("producto-cliente")}>Atras</button>
                            <input id="productoBusqueda" type="text" placeholder={"Busqueda de Producto ("+this.props.tipoProducto.toUpperCase()+")"}/>
                            <button onClick={()=>this.buscarProducto()}>Buscar</button>
                        </div>
                    </div>
                    <div className="centrado">
                        <div className="productos_paginacion">
                            <input type="button" value="<"/>
                            <input type="text" defaultValue="1/100"/>
                            <input type="button"value=">"/>
                        </div>
                    </div>

                    <div className="productos_lista">
                        {(this.props.productos||[]).map(producto => {
                            return(/* LISTA DE PRODUCTOS */
                                <div className="producto_item" key={producto.idProducto}>
                                    <img src={producto.imagenTipoProducto} alt={producto.nombreProducto}/>
                                    <div className="centrado">
                                        <div className="producto_item_datos">
                                            <label>
                                                <div style={{fontSize:"3vh"}}><b>{producto.nombreProducto}</b><br/></div>
                                                <div style={{fontSize:"2.9vh"}}>Precio: S/: {parseFloat(producto.precioPorUnidad||0).toFixed(2) + " x " + unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)}<br/></div>
                                                <div style={{fontSize:"2.5vh"}}><b>Disponible:  </b> {"5 KG"} <b> Tienda:  </b>{producto.nombreNegocio}</div>   
                                                <div style={{fontSize:"2vh"}}>Description -> (Más Información!...)</div>
                                            </label>
                                            <button onClick={()=>this.props.agregarCanasta(producto)}> + </button>
                                        </div>
                                    </div>
                                </div>
                                
                            );
                        })}
                    </div>
                </div>
            )
        }else { return null }
    }
}

export default ProductoLista;
