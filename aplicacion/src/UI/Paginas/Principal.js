/* COMPONENTES */
import React from 'react';
import IconoLupa from '../../SVG/IconoLupa';
import IconoMercado from '../../SVG/IconoMercado';

/* VARIABLES GLOBALES */
const estadoInicial = {
    nombreCiudad:'',
};

export class Principal extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    buscarProducto =(evento)=> {
        evento.preventDefault();
        var textoBuscar = document.getElementById("textoBuscar").value||"_";
        var nombreCiudad = document.getElementById('nombreCiudad').value||"cusco";
        this.props.history.push("/productos/buscador/"+nombreCiudad+"/TODO/0/"+textoBuscar);
    }

    cambiarCiudad =()=> {
        var nombreCiudad = document.getElementById('nombreCiudad').value;
        console.log(nombreCiudad);
        this.setState({nombreCiudad},()=>{
            this.props.history.push("/"+(nombreCiudad||"").toLowerCase())
        });
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
        this.props.history.push(ruta);
    }

    componentDidMount(){
        const { ciudad } = this.props; 
        if(!this.verificarCiudad(ciudad)){
            //this.props.history.push("/")
        }
    }

    render(){
        return(
            <div className="PrincipalBuscador centrado">
                <div className="principal_buscador centrado">
                    <div className="principal_buscador_mensaje">
                        <label>REACTIVA PERÚ</label>
                        <div className="centrado">
                            <select className="pricipal_buscador_ciudad" id="nombreCiudad" onChange={()=>this.cambiarCiudad()} defaultValue={this.props.ciudad||"ciudad"}>
                                <option value="ciudad">Ciudad</option>
                                <option value="cusco">Cusco</option>
                                <option value="arequipa">Arequipa</option>
                                <option value="lima">Lima</option>
                            </select>
                        </div>
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