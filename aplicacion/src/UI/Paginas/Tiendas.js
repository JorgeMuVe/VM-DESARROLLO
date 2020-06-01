/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* FUNCIONES */
import { listarNegociosTipo_DB } from '../../DB/tiendaDB';
//import {  } from '../../DB/productoDB';


/* VARIABLES GLOBALES */
const estadoInicial = {
    negociosTipo:[1,2,3,4],
};

export class Producto extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    obtenerNegocios =(tipoNegocio)=> {
        const Tipo = {tipoNegocio:tipoNegocio,inicio:0,cantidad:10}
        listarNegociosTipo_DB(Tipo).then(res=>{
            if(!res.error){
                this.setState({negociosTipo:res.listaNegocios});
            } else { console.log("ERROR >> LISTAR NEGOCIO TIPO"); }
        });
    }

    buscarProductosNegocio =(negocio)=> {
        console.log(negocio);
        this.props.history.push("/productos/buscador/TODO/_");
    }

    componentDidMount(){
        this.obtenerNegocios(this.props.match.params.tipo);
    }

    render(){
        return(
            <div className="TiendaLista">
                <div className="centrado">
                    <div className="tienda_lista">
                        {(this.state.negociosTipo||[]).map((negocio,i)=>
                            <div className="tienda_lista_tipo" onClick={()=>{this.buscarProductosNegocio(negocio)}} key={i}>
                                <div className="tienda_lista_tipo_boton">
                                    <img src={negocio.logo} alt="Fondo Tipo Producto"/>
                                    <div>
                                        <span>{negocio.nombreNegocio}</span>
                                        <span>{negocio.descripcionNegocio}</span>
                                        <span>{negocio.correoNegocio}</span>
                                        <span>{negocio.telefonoNegocio}</span>
                                    </div>
                                </div> 
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Producto;
