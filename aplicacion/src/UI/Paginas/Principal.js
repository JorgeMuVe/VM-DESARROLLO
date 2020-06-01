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
                    
                    <div className="centrado" onClick={()=>this.props.history.push('/tiendas/mercado')}><IconoMercado/><label>Mercados</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('/tiendas/restaurante')}><IconoMercado/><label>Restaurantes</label></div>
                    
                    <div className="centrado" onClick={()=>this.props.history.push('/tiendas/comercio')}><IconoMercado/><label>Comercios</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('/tiendas/supermercado')}><IconoMercado/><label>Supermercados</label></div>
                    
                    <div className="centrado" onClick={()=>this.props.history.push('/tiendas/farmacia')}><IconoMercado/><label>Farmacias</label></div>
                    <div className="centrado" onClick={()=>this.props.history.push('/tiendas/agencia')}><IconoMercado/><label>Agencias</label></div>

                </div>
            </div>
        )
    }
}

export default Principal;