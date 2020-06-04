/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {
    tipoProductos:[]
};

export class Categorias extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerCategoria =(categoria)=> {
        this.setState({ tipoProductos: [
            {nombreTipoProducto:'VERDURA',imagenTipoProducto:'/img/fondos/veduras.jpg'},
            {nombreTipoProducto:'CARNE',imagenTipoProducto:'/img/fondos/carnes.jpg'},
            {nombreTipoProducto:'LACTEO',imagenTipoProducto:'/img/fondos/lacteos.jpg'}
        ]});
    }

    verificarCategoria =(categoria)=> {
        var mostrar = false;
        switch (categoria) {
            case "mercados": mostrar=true; break;
            case "restaurantes": mostrar=true; break;
            case "comercios": mostrar=true; break;
            case "supermercados": mostrar=true; break;
            case "farmacias": mostrar=true; break;
            case "servicios": mostrar=true; break;
            default: mostrar=false; break;
        }
        return mostrar;
    }

    buscarProductos =(tipoProducto)=> {
        this.props.history.push("/productos/buscador/TODO/_")
    }

    componentDidMount(){
        const { categoria } = this.props.match.params; 
        if(this.verificarCategoria(categoria)){ 
            this.obtenerCategoria(categoria);
        } else { this.props.history.push("/") }
    }

    render(){
        return(
            <div className="Principal centrado">
                <div className="principal_categoria">
                    <label>{ (this.props.match.params.categoria||"categoria").toUpperCase() }</label>
                    {(this.state.tipoProductos||[]).length>0?
                    <div className="principal_categoria_opciones">
                        {(this.state.tipoProductos||[]).map((tipo,i)=>{return(
                        <div style={{background:"linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url("+(tipo.imagenTipoProducto)+")no-repeat center/cover"}}
                            key={i} onClick={()=>this.buscarProductos(tipo.nombreTipoProducto)}>
                            {tipo.nombreTipoProducto}
                        </div>
                        )})}
                        <div style={{background:"linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))"}}
                            onClick={()=>this.props.history.push("/tiendas/"+this.props.match.params.categoria)}>
                            Tiendas
                        </div>
                    </div>
                    :
                    <div>
                        Sin registro de Categorias.
                    </div>}
                </div>
            </div>
        )
    }
}

export default Categorias;