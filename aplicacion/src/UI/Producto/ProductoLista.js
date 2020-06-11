/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import { listarTiposProducto_DB } from '../../DB/productoDB';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Producto extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerTiposProducto =()=> {
        listarTiposProducto_DB().then(res=>{
            console.log(res);
        });
    }

    redireccionar =(idTipoProducto)=> {
        this.props.history.push("/productos/buscador/cusco/TIPOPRODUCTO/"+idTipoProducto+"/_");
        
    }

    componentDidMount(){
        //this.obtenerTiposProducto();
    }
    render(){
        return(
            <div className="ProductoLista">
                <div className="centrado">
                    <div className="producto_lista">
                        <div className="producto_lista_tipo" onClick={()=>{this.redireccionar(2)}}>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/productos/carnes--verduras.jpg" alt="Fondo Tipo Producto"/>
                                <div>Verduras y Carnes</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{this.redireccionar(11)}}>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/productos/lacteos---embutidos.jpg" alt="Fondo Tipo Producto"/>
                                <div>Lacteos y Embutidos</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{this.redireccionar(5)}}>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/productos/ropa---zapatillas.jpg" alt="Fondo Tipo Producto"/>
                                <div>Ropa y Zapatillas</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{this.redireccionar(5)}}>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/productos/comidas---bebidas.jpg" alt="Fondo Tipo Producto"/>
                                <div>Comidas y Bebidas</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{this.redireccionar(4)}}>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/productos/aseo-limpieza.jpg" alt="Fondo Tipo Producto"/>
                                <div>Aseo y Limpieza</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{this.redireccionar(15)}}>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/productos/servicios.jpg" alt="Fondo Tipo Producto"/>
                                <div>Servicios y Ofertas</div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Producto;
