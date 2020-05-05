/*
-- Description:      Pantalla Principal de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Principal extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    render(){
        return(
            <div className="Principal">
                <div className="centrado">
                    <div className="boton_imagen" onClick={()=>this.props.cambiarPagina('producto-cliente')}>
                        <img src={this.props.urlAplicacion + "/img/fondos/producto.jpg"} alt="Fondo Producto Cliente"/>
                        <div> Mercados </div>
                    </div>
                </div>
                <div className="centrado">
                    <div className="boton_imagen" onClick={()=>this.props.cambiarPagina('producto-cliente')}>
                        <img src={this.props.urlAplicacion + "/img/fondos/restaurantes.jpg"} alt="Fondo Producto Cliente"/>
                        <div> Restaurantes </div>
                    </div>
                </div>
                <div className="centrado">
                    <div className="boton_imagen" onClick={()=>this.props.cambiarPagina('producto-cliente')}>
                        <img src={this.props.urlAplicacion + "/img/fondos/farmacias.jpg"} alt="Fondo Producto Cliente"/>
                        <div> Farmacias </div>
                    </div>
                </div>
                <div className="centrado">
                    <div className="boton_imagen" onClick={()=>this.props.cambiarPagina('producto-cliente')}>
                        <img src={this.props.urlAplicacion + "/img/fondos/servicios.jpg"} alt="Fondo Producto Cliente"/>
                        <div> Servicios </div>
                    </div>
                </div>
                <div className="centrado">
                    <div className="boton_imagen" onClick={()=>this.props.cambiarPagina('producto-cliente')}>
                        <img src={this.props.urlAplicacion + "/img/fondos/ofertas.jpg"} alt="Fondo Producto Cliente"/>
                        <div> Ofertas </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Principal;

/*
<div className="principal_negocio">
    <div className="principal_boton" onClick={()=>this.props.cambiarPagina('venta')} style={{height:'20vh', color:'teal'}}>
        <img src={this.props.urlAplicacion + "/img/fondos/negocio.jpg"} alt="Fondo Negocio"/>
        <div>Negocio</div>
    </div>
    <div className="principal_boton" onClick={()=>this.props.cambiarPagina('entrega')} style={{height:'20vh',color:'teal'}}>
        <img src={this.props.urlAplicacion + "/img/fondos/entrega.jpg"} alt="Fondo Entrega"/>
        <div>Entrega</div>
    </div>
</div>
*/