/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Producto extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    
    cambiarPagina =(nombrePagina,idTipoProducto)=> {
        this.props.cambiarPagina('productoLista-'+nombrePagina);
        this.props.listarProductoPorTipo(idTipoProducto);
    }

    render(){
        if(this.props.tipoUsuario.split("-")[0]==="producto"){
            var tipoUsuario = this.props.tipoUsuario.split("-")[1];
            return(
                <div className="Producto">
                    <div className="producto_tipo"
                        hidden={tipoUsuario !== "cliente"}
                        onClick={()=>this.cambiarPagina('verduras' , 1)}
                    > <div className="principal_boton" style={{height:'100%'}}>
                        <img src={this.props.urlAplicacion + "/img/fondos/verduras.jpg"} alt="Fondo Entrega"/>
                        <div>Verduras</div>
                    </div> </div>

                    <div className="producto_tipo"
                        hidden={tipoUsuario !=="cliente"}
                        onClick={()=>this.cambiarPagina('carnes' , 2)}
                    > <div className="principal_boton"> 
                        <img src={this.props.urlAplicacion + "/img/fondos/carnes.jpg"} alt="Fondo Entrega"/>
                        <div>Carnes</div>
                    </div> </div>

                    <div className="producto_tipo"
                        hidden={tipoUsuario !== "cliente"}
                        onClick={()=>this.cambiarPagina('lacteos', 3)}
                    > <div className="principal_boton"> 
                        <img src={this.props.urlAplicacion + "/img/fondos/lacteos.jpg"} alt="Fondo Entrega"/>
                        <div>Lacteos</div>
                    </div> </div>
                    
                    <div className="producto_tipo"
                        hidden={tipoUsuario !== "cliente"}
                        onClick={()=>this.cambiarPagina('bebidas',4)}
                    > <div className="principal_boton"> 
                        <img src={this.props.urlAplicacion + "/img/fondos/bebidas.jpg"} alt="Fondo Entrega"/>
                        <div>Bebidas</div>
                    </div> </div>

                    <div className="producto_tipo"
                        hidden={tipoUsuario !== "cliente"}
                        onClick={()=>this.cambiarPagina('limpieza',5)}
                    > <div className="principal_boton"> 
                        <img src={this.props.urlAplicacion + "/img/fondos/limpieza.jpg"} alt="Fondo Entrega"/>
                        <div>Limpieza</div>
                    </div> </div>

                    <div className="producto_tipo"
                        hidden={tipoUsuario !== "cliente"}
                        onClick={()=>this.cambiarPagina('ofertas',6)}
                    > <div className="principal_boton">
                        <img src={this.props.urlAplicacion + "/img/fondos/ofertas.jpg"} alt="Fondo Entrega"/>
                        <div> Ofertas</div>
                    </div> </div>

                    <div className="producto_tipo"
                        hidden={tipoUsuario !== "negocio"}
                        onClick={()=>this.cambiarPagina('misProductos',7)}
                    > <div className="producto_tipo_boton"> Mis Productos </div> </div>

                    <div className="producto_tipo"
                        hidden={tipoUsuario !== "negocio"}
                        onClick={()=>this.cambiarPagina('misOfertas',8)}
                    > <div className="producto_tipo_boton"> Mis ofertas </div> </div>
                </div>
            )
        } else { return null }
    }
}

export default Producto;
