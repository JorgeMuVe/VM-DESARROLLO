/* COMPONENTES */
import React from 'react';
import { NavLink } from "react-router-dom";
import {withRouter} from 'react-router';

import { buscarProducto_DB } from '../DB/productoDB';

/***   ICONOS   ***/
import IconoPedido from '../SVG/menu/IconoPedido';
import IconoNotificacion from '../SVG/menu/IconoNotificacion';
import IconoUsuario from '../SVG/menu/IconoUsuario';


import IconoMercado from '../SVG/menu/IconoMercado';
import IconoRestaurante from '../SVG/menu/IconoMercado';
import IconoComercio from '../SVG/menu/IconoMercado';
import IconoSupermercado from '../SVG/menu/IconoMercado';
import IconoFarmacia from '../SVG/menu/IconoMercado';
import IconoAnuncios from '../SVG/menu/IconoMercado';


/* VARIABLES GLOBALES */
const estadoInicial = {
    notificaciones:0
};

export class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    redireccionar =(ruta)=>{ window.location.href = ruta }

    abrirModalPedido =()=> {
        if(sessionStorage.getItem('ciudad')!=='ciudad'){
            this.props.controlModalPedido()
        } else { alert("Seleccione una ciudad!.") }
    }

    buscadorProductoBoton =(evento)=> {
        evento.preventDefault();
        this.setState({paginaActual:1},()=>{
            this.buscarProductoTipo();
        });
    }

    buscarProductoTipo =()=> {
        const {ciudad} = this.props;
        const Buscador={
            ciudad1:ciudad,ciudad:"cusco", tipo: "TODO",
            texto: document.getElementById("textoBuscar").value||"_",id:0,
            inicio: (this.state.paginaActual-1)*this.state.productosPorPagina,
            cantidad: this.state.productosPorPagina
        };
        this.props.history.push("/productos/buscador/"+Buscador.ciudad+"/"+Buscador.tipo+"/"+Buscador.id+"/"+Buscador.texto);
        this.buscadorProducto(Buscador);
    }

    buscadorProducto =(Buscador)=> {
        buscarProducto_DB(Buscador).then(res=>{
            if(!res.error){
                var cantidadPaginas = (res[0].cantidadProductos / this.state.productosPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas||1);
                this.setState({cantidadPaginas,listaProductos:res})
            }else { this.setState({cantidadPaginas:1,listaProductos:[]}) }
        });
    }

    cambiarCiudad =()=> {
        var nombreCiudad = document.getElementById('nombreCiudad').value;
        this.props.cambiarCiudad(nombreCiudad);
    }

    render(){
        return(
            <div className="Menu2">
                

                <div className="Menu2_superior">
                    <NavLink to="/" className="Menu2_superior_logo"></NavLink>
                    <div className="Menu2_superior_usuario">
                        <div onClick={()=>this.abrirModalPedido()}><IconoPedido fill="#fff"/></div>
                        <div><IconoNotificacion fill="linear-gradient(-45deg,#EE7752,#E51b1b)"/></div>                     
                        <div onClick={()=>this.props.controlModalIngreso()}><IconoUsuario fill="#fff"/></div>
                    </div>
                </div>
                <div className="Menu2_inferior">
                    <div className="Menu2_inferior_opciones">
                        <div onClick={()=>this.props.cambiarCategoria("mercados")}><NavLink to="/categoria/mercados"><span className="centrado"><IconoMercado fill="#fff"/></span><label style={{color:'white'}}>Mercados</label></NavLink></div>
                        <div onClick={()=>this.props.cambiarCategoria("supermercados")}><NavLink to="/categoria/supermercados"><span className="centrado"><IconoSupermercado fill="#fff"/></span><label style={{color:'white'}}>Supermercados</label></NavLink></div>
                        <div onClick={()=>this.props.cambiarCategoria("restaurantes")}><NavLink to="/categoria/restaurantes"><span className="centrado"><IconoRestaurante fill="#fff"/></span><label style={{color:'white'}}>Restaurantes</label></NavLink></div>
                    </div>
                    <div className="Menu2_inferior_opciones">                    
                        <div onClick={()=>this.props.cambiarCategoria("anuncios")}><NavLink to="/perfiltienda/:idTienda"><span className="centrado"><IconoAnuncios fill="url(#rojo_naranja)"/></span><label style={{color:'white'}}>Anuncios</label></NavLink></div>
                        <div onClick={()=>this.props.cambiarCategoria("comercios")}><NavLink to="/categoria/comercios"><span className="centrado"><IconoComercio fill="#fff"/></span><label style={{color:'white'}}>Comercios</label></NavLink></div>
                        <div onClick={()=>this.props.cambiarCategoria("farmacias")}><NavLink to="/categoria/farmacias"><span className="centrado"><IconoFarmacia fill="#fff"/></span><label style={{color:'white'}}>Farmacias</label></NavLink></div>
                    </div>
                </div>
                <div className="Menu2_buscador">
                    <div className="centrado">
                        <form className="Menu2_buscador_cuadro" noValidate onSubmit={this.buscadorProductoBoton}>
                            <select id="nombreCiudad" onChange={()=>this.cambiarCiudad()} defaultValue={this.props.ciudad||"ciudad"}>
                                <option value="cusco">CIUDAD</option>
                                <option value="cusco">CUSCO</option>
                                <option value="arequipa">AREQP</option>
                                <option value="lima">LIMA</option>
                            </select>
                            <input type="text" id="textoBuscar" placeholder="Busca tu producto"/>
                            <button type="submit">BUSCAR</button>
                        </form>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Menu);