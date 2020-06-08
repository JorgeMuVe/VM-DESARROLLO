/* COMPONENTES */
import React from 'react';

/* FUNCIONES */
import { listarTiposProductoPorTipoNegocio_DB } from '../../DB/negocioDB';

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
        const Negocio = {idTipoNegocio:categoria}
        listarTiposProductoPorTipoNegocio_DB(Negocio).then(res=>{
            if(!res.error){
                this.setState({tipoProductos : res})
            }else { console.log("ERROR >> " + res.error) }
        });
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

    buscarProductos =(tipoProducto)=> {
        this.props.history.push("/productos/buscador/TODO/_")
    }

    componentDidMount(){
        const { categoria } = this.props.match.params;
        var idCategoria = this.verificarCategoria(categoria)
        if(idCategoria>0){ 
            this.obtenerCategoria(idCategoria);
        } else { this.props.history.push("/") }
    }

    render(){
        return(
            <div className="PrincipalCategoria centrado">
                <div className="principal_categoria">
                    <label>{ (this.props.match.params.categoria||"categoria").toUpperCase() }</label>
                    {(this.state.tipoProductos||[]).length>0?
                    <div className="principal_categoria_opciones">
                        {(this.state.tipoProductos||[]).map((tipo,i)=>{return(
                        <div style={{background:"linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url("+(tipo.imagenTipoProducto)+")no-repeat center/cover",textTransform:"capitalize"}}
                            key={i} onClick={()=>this.buscarProductos(tipo.nombreTipoProducto)}>
                            {tipo.nombreTipoProducto}
                        </div>
                        )})}
                        <span className="principal_categoria_opciones_tienda"
                            onClick={()=>this.props.history.push("/tiendas/"+this.props.match.params.categoria)}>
                            Tiendas
                        </span>
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