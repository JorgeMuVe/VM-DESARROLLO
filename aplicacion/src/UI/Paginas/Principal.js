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
        window.location.href = "/productos/buscador/TODO/"+textoBuscar;
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
                    
                    <div className="centrado"><IconoMercado/><label>Ropa</label></div>
                    <div className="centrado"><IconoMercado/><label>Comida</label></div>
                    <div className="centrado"><IconoMercado/><label>Farmacia</label></div>
                    <div className="centrado"><IconoMercado/><label>Equipos</label></div>
                    <div className="centrado"><IconoMercado/><label>Verdura</label></div>
                    <div className="centrado"><IconoMercado/><label>Carne</label></div>
                    <div className="centrado"><IconoMercado/><label>Lacteo</label></div>
                    <div className="centrado"><IconoMercado/><label>Servicios</label></div>

                </div>
            </div>
        )
    }
}

export default Principal;