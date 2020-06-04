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

    verificarCiudad =(ciudad)=> {
        var mostrar = false;
        switch (ciudad) {
            case "lima": mostrar=true; break;
            case "arequipa": mostrar=true; break;
            case "cusco": mostrar=true; break;
            default: mostrar=false; break;
        }
        return mostrar;
    }

    buscarCategoria =(ruta)=> {
        console.log(ruta);
        this.props.history.push(ruta);
    }

    componentDidMount(){
        const { ciudad } = this.props; 
        if(!this.verificarCiudad(ciudad)){
            this.props.history.push("/")
        }
    }

    render(){
        return(
            <div className="Principal centrado">
                <div className="principal_buscador">
                    <div className="principal_buscador_mensaje">
                        <h1>REACTIVA PERÚ</h1>
                        <div>{(this.props.ciudad||"").toUpperCase()}</div>
                    </div>
                    <div className="centrado">
                        <form onSubmit={this.buscarProducto} className="principal_buscador_cuadro" style={{margin:"10px",padding:"5px"}}>
                            <div className="centrado"><IconoLupa/></div>
                            <input type="text" id="textoBuscar" placeholder="Nombre del Producto"/>
                            <button type="submit">BUSCAR</button>
                        </form>
                    </div>
                </div>
                <div className="principal_categorias centrado">
                    
                    <div className="centrado" onClick={()=>this.buscarCategoria('/categoria/mercados')}><IconoMercado/><label>Mercados</label></div>
                    <div className="centrado" onClick={()=>this.buscarCategoria('/categoria/restaurantes')}><IconoMercado/><label>Restaurantes</label></div>
                    
                    <div className="centrado" onClick={()=>this.buscarCategoria('/categoria/comercios')}><IconoMercado/><label>Comercios</label></div>
                    <div className="centrado" onClick={()=>this.buscarCategoria('/categoria/supermercados')}><IconoMercado/><label>Supermercados</label></div>
                    
                    <div className="centrado" onClick={()=>this.buscarCategoria('/categoria/farmacias')}><IconoMercado/><label>Farmacias</label></div>
                    <div className="centrado" onClick={()=>this.buscarCategoria('/categoria/servicios')}><IconoMercado/><label>Servicios</label></div>

                </div>
            </div>
        )
    }
}

export default Principal;