/*
-- Description:      Pantalla Principal de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import IconoLupa from '../../SVG/IconoLupa';
import IconoMercado from '../../SVG/IconoMercado';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Principal extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    buscarProducto =(evento)=> {
        evento.preventDefault();
        var textoBuscar = (document.getElementById("textoBuscar").value||"_");
        this.props.history.push("/productos/buscador/TODO/"+textoBuscar);
    }

    render(){
        return(
            <div className="Principal centrado">
                <div className="principal_buscador centrado">
                    <div className="principal_buscador_mensaje">
                        <h1>ENCUENTRA EL PRODUCTO QUE ESTAS BUSCANDO</h1>
                        <div>DELIVERY A LA PUERTA DE TU CASA</div>
                    </div>
                    <form onSubmit={this.buscarProducto} className="principal_buscador_cuadro" style={{margin:"10px",padding:"5px"}}>
                        <div className="centrado"><IconoLupa/></div>
                        <input type="text" id="textoBuscar" placeholder="Nombre del Producto"/>
                        <button type="submit">BUSCAR</button>
                    </form>
                </div>
                <div className="principal_categorias centrado">
                    
                    <div className="centrado" onClick={()=>this.props.history.push('productos/buscador/ROPA/_')}><IconoMercado/><label>Ropa</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('productos/buscador/COMIDA/_')}><IconoMercado/><label>Comida</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('productos/buscador/EXTRACTO/_')}><IconoMercado/><label>Farmacia</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('productos/buscador/EQUIPO/_')}><IconoMercado/><label>Equipos</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('productos/buscador/VERDURA/_')}><IconoMercado/><label>Verdura</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('productos/buscador/CARNE/_')}><IconoMercado/><label>Carne</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('productos/buscador/LACTEO/_')}><IconoMercado/><label>Lacteo</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('productos/buscador/BEBIDA/_')}><IconoMercado/><label>Servicios</label></div>

                </div>
            </div>
        )
    }
}

export default Principal;