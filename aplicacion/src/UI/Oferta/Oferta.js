/*
-- Description:      Pantalla de Producto de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {
    listaProducto:[1,2,3],
    mostarLista:true,
    canastaProducto:[]
};

export class Producto extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    mostarListaProducto =()=> this.setState({mostarLista:!this.state.mostarLista});
    agregarCanasta =(producto)=> {
        this.setState({canastaProducto:this.state.canastaProducto.concat([producto])}, ()=> {
            console.log(this.state.canastaProducto);
        });
    }
    render(){
        return(
            <div className="Productos">
                <div className={"productos_disponibles " + (this.state.mostarLista?"":"ocultar")}>
                    <div className="busqueda_producto">
                        <button onClick={()=>this.mostarListaProducto()}>Atras</button>
                        <input type="text" placeholder="Busqueda de Producto"/>
                        <button onClick={()=>this.abrirTipoProduto}>Buscar</button>
                    </div>
                    <div className="lista_paginacion">
                        <input type="button" value="<"/>
                        <input type="text" maxLength={7} defaultValue="1/100" style={{width:'50px'}}/>
                        <input type="button"value=">"/>
                    </div>
                    <div className="lista_productos">
                        {(this.state.listaProducto||[]).map(producto => {
                            return(/* LISTA DE PRODUCTOS */
                                <div className="item_producto centrado" key={producto}>
                                    <div className="item_producto_imagen">
                                        <img src={this.props.urlAplicacion + "/img/productos/carne.jpg"} alt="Tomates rojos"/>
                                    </div>
                                    <div className="item_producto_datos">
                                        <div><b>Tomate Rojo {producto}</b></div>
                                        <div><b>Precio por Kg:  </b> S/.1.30</div>
                                        <div>Description -> (Click en Más... de la imagen)</div>
                                        <div>Tienda: Doña Dolores</div>
                                        <div>Disponible: 11.50 Kg</div>
                                    </div>
                                    <div className="item_producto_agregar">
                                        <button onClick={()=>this.agregarCanasta(producto)}>+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Producto;
