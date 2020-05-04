/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Productos from '../Producto/Productos';
import Pedido from '../Pedido/Pedido';
import Oferta from '../Oferta/Oferta';

/* VARIABLES GLOBALES */
const estadoInicial = {
    paginaAnterior:0,
    paginaActual:0,
    paginas:[
        {numero:0,titulo:'Delipedido'},
        {numero:1,titulo:'Productos'},
        {numero:2,titulo:'Mi Canasta'},
        {numero:3,titulo:'Pagar Pedido'},
    ]
};

export class Negocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    paginaAnterior =()=> {
        const {paginaAnterior,paginaActual} = this.state;
        this.setState({paginaActual:paginaAnterior,paginaAnterior:paginaActual});
    }
    cambiarPagina =(pagina)=> {        
        const {paginaActual} = this.state;
        this.setState({paginaActual:parseInt(pagina),paginaAnterior:paginaActual});
    }
    render(){
        return(
            <div className="Cliente">
                <div className="cliente_productos">
                    <a href="/negocio"><div className="cliente_productos_boton">
                        Verduras
                    </div></a>
                    <a href="/negocio"><div className="cliente_productos_boton">
                        Carnes
                    </div></a>
                    <a href="/negocio"><div className="cliente_productos_boton">
                        Lacteos
                    </div></a>
                    <a href="/negocio"><div className="cliente_productos_boton">
                        Bebidas
                    </div></a>
                    <a href="/negocio"><div className="cliente_productos_boton">
                        Comidas
                    </div></a>
                    <a href="/negocio"><div className="cliente_productos_boton">
                        Ofertas
                    </div></a>
                </div>
                <div hidden={true}>
                    <Productos></Productos>
                </div>
                <div hidden={true}>
                    <Oferta></Oferta>
                </div>
                <div hidden={true}>
                    <Pedido></Pedido>
                </div>
            </div>
        )
    }
}

export default Negocio;
