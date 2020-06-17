/* COMPONENTES */
import React from 'react';

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

    abrirTienda =(negocio)=>{
        this.props.history.push("/productos/buscador/cusco/NEGOCIO/"+negocio.idNegocio+"/_");
    } 

    abrirProductos =()=> {
        const { categoria } = this.props.match.params;
        var idCategoria = this.verificarCategoria(categoria);
        this.props.history.push("/productos/buscador/cusco/TIPONEGOCIO/"+idCategoria+"/_");
    }

    componentDidMount(){
        if(this.props.negocios.length<1){
            const { categoria } = this.props.match.params;
            this.props.cambiarCategoria(categoria);
        }
    }

    render(){
        return(
            <div className="PrincipalCategoria centrado">
                <div className="principal_categoria">
                    <label className="texto_temaRojo">{ (this.props.match.params.categoria||"categoria").toUpperCase() }</label>
                    {(this.props.negocios||[]).length>0?
                    <div className="principal_categoria_opciones">
                        {(this.props.negocios||[]).map((negocio,i)=>{return(
                        <div key={i} onClick={()=>this.abrirTienda(negocio)} style={{
                            background:"linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url("+(negocio.logo)+")no-repeat center/cover",
                            textTransform:"capitalize",textAlign:"center"
                        }}>
                            {negocio.nombreNegocio}
                        </div>
                        )})}
                    </div>
                    :
                    <div style={{color:"white"}}>
                        No existen Negocios en esta Categoria.
                    </div>}

                    <span className="principal_categoria_opciones_tienda"
                        onClick={()=>this.abrirProductos()}>
                        Productos
                    </span>
                </div>
            </div>
        )
    }
}

export default Categorias;