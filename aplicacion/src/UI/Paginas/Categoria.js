/* COMPONENTES */
import React from 'react';
import Paginado from '../../Componentes/Paginado';

import { unidadMedidaProducto } from '../../Componentes/Funciones';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Categorias extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    verificarCategoria =(categoria)=> {
        var idCategoria = 0;
        switch (categoria) {
            case "mercados": idCategoria=1; break;
            case "restaurantes": idCategoria=2; break;
            case "comercios": idCategoria=3; break;
            case "supermercados": idCategoria=4; break;
            case "farmacias": idCategoria=5; break;
            case "servicios": idCategoria=6; break;
            default: idCategoria=0; break;
        }
        return idCategoria;
    }

    calcularPrecioProducto =(producto)=> {
        return <b>S/. {
            parseFloat(producto.precioPorUnidad||0).toFixed(2)+" x "+
            unidadMedidaProducto(producto.unidadCantidad,producto.tipoUnidad)}</b>
    }

    abrirTienda =(negocio)=>{
        this.props.history.push("/productos/buscador/cusco/NEGOCIO/"+negocio.idNegocio+"/_");
    }

    paginaSiguiente =()=> {
        const { categoria } = this.props.match.params;
        this.props.paginaSiguiente(categoria);
    }

    paginaAtras =()=> {
        const { categoria } = this.props.match.params;
        this.props.paginaAtras(categoria);
    }

    componentDidMount(){
        if(this.props.categoriaNegocios.length<1 || this.props.categoriaProductos.length<1){
            const { categoria } = this.props.match.params;
            this.props.cambiarCategoria(categoria);
        }
    }

    render(){
        return(
            <div className="PrincipalCategoria centrado">
                <div className="principal_categoria">
                    <label>{ (this.props.match.params.categoria||"categoria").toUpperCase() }</label>
                    {(this.props.categoriaNegocios||[]).length>0?
                    <div className="principal_categoria_opciones">
                        {(this.props.categoriaNegocios||[]).map((negocio,i)=>{return(
                            <div className="principal_categoria_item" key={i} onClick={()=>this.abrirTienda(negocio)}>
                                <div className="centrado">
                                    <div className="principal_categoria_item_imagen centrado">
                                        <img src={negocio.logo} alt="Logo Negocio"/>
                                    </div>
                                </div>
                                <div className="principal_categoria_item_dato">
                                    <span>{negocio.nombreNegocio}</span>
                                    <label>{negocio.descripcionNegocio}</label>
                                </div>
                            </div>
                        )})}
                    </div>
                    :
                    <div style={{color:"white"}}>
                        No existen Negocios en esta Categoria.
                    </div>}

                    <div className="ProductoBuscador">
                        <div style={{textAlign:'center',marginTop:'5px'}}><label>Productos</label></div>
                        <div className="centrado">
                            <div className="producto_buscador">
                                <div className="centrado">
                                    <Paginado
                                        paginaActual={this.props.paginaActual}
                                        cantidadPaginas={this.props.cantidadPaginas}
                                        paginaSiguiente={this.paginaSiguiente}
                                        paginaAtras={this.paginaAtras}
                                    />
                                </div>
                                <div className="centrado">
                                    {(this.props.categoriaProductos||[]).length > 0?
                                    <div className="centrar_lista">
                                        <div className="lista_DiseñoProductos no-seleccionable">
                                            {(this.props.categoriaProductos || []).map((Dprod, i) =>
                                                <div className="lista_DiseñoProductos_item" key={i} onClick={()=>this.props.seleccionarProductoCantidad(Dprod)}>
                                                    <div className="DiseñoProductos_item_imagen">
                                                        <img className="imagenR" alt="Imagen Producto" src={Dprod.imagenProducto}></img>
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
                </div>
            </div>
        )
    }
}

export default Categorias;

/*
<div>
    <div className="principal_categoria_item">
        <div className="centrado">
            <img src={negocio.logo} alt="Logo Negocio"/>
        </div>
        <div>
            <span>{negocio.nombreNegocio}</span>
            <span>{negocio.descripcionNegocio}</span>
        </div>
    </div>
    <div key={i} onClick={()=>this.abrirTienda(negocio)} style={{
        background:"linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url("+(negocio.logo)+")no-repeat center/cover",
        textTransform:"capitalize",textAlign:"center"}}>

        {negocio.nombreNegocio}
    </div>
</div>
*/