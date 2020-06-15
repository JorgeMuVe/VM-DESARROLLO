/* COMPONENTES */
import React from 'react';

import IconoSupermercado from '../../SVG/IconoPedido';


/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Principal extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    cambiarCiudad =()=> {
        var nombreCiudad = document.getElementById('nombreCiudad').value;
        this.props.cambiarCiudad(nombreCiudad);
    }

    buscarProducto =(producto)=> {
        var productoSeleccionado={
            nombreProducto:producto
        };
        this.props.seleccionarProductoCantidad(productoSeleccionado);
    }

    render(){
        return(
            <div className="Principal3">
                <div className="principal_lateral">
                    <div className="principal3_publicidad">
                        <div className="principal3_publicidad_lista_lateral sliderVerticalAnimacion">
                            <div onClick={()=>this.buscarProducto("22")}><img src="/img/publicidad/cartas/chifa.jpg" alt="img" width="100%" height="100%"></img></div>
                            <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/cartas/munaycha.jpg" alt="img" width="100%" height="100%"></img></div>
                            <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/cartas/nattys.jpg" alt="img" width="100%" height="100%"></img></div>
                            <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/cartas/sumaq.jpg" alt="img" width="100%" height="100%"></img></div>
                        </div>
                    </div>
                </div>
                <div className="PrincipalCentral">
                    <div className="principal_central">
                        <div className="principal_central_opciones">
                            <div><IconoSupermercado fill="#fff"/><label>Fácil, rápido y seguro. <a href="##"> Cómo comprar</a></label></div>
                            <span className="centrado"><span className="linea_vertical"></span></span>
                            <div><IconoSupermercado fill="#fff"/><label>Información de medidas de Seguridad y Saneamiento. <a href="##"> Saber más</a></label></div>
                            <span className="centrado"><span className="linea_vertical"></span></span>
                            <div><IconoSupermercado fill="#fff"/><label>Paga con crédito o débito. <a href="##"> Ver promociones</a></label></div>
                            <span className="centrado"><span className="linea_vertical"></span></span>
                            <div><IconoSupermercado fill="#fff"/><label>Ayuda y seguimiento en tu pedido. <a href="##"> Centro de ayuda</a></label></div>
                        </div>
                        <div className="principal3_publicidad" style={{marginTop:"10px"}}>
                            <div className="principal3_publicidad_lista_central sliderHorizontalAnimacion">
                                <div onClick={()=>this.buscarProducto("22")}><img src="/img/publicidad/comidas/burger.png" alt="img" width="100%" height="100%"></img></div>
                                <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/comidas/ceviche.jpg" alt="img" width="100%" height="100%"></img></div>
                                <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/comidas/fastfood.jpg" alt="img" width="100%" height="100%"></img></div>
                                <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/comidas/pollo.jpg" alt="img" width="100%" height="100%"></img></div>
                            </div>
                        </div>
                        <div className="principal3_publicidad">
                            <div className="principal3_publicidad_lista_central sliderHorizontalAnimacionInvert">
                                <div onClick={()=>this.buscarProducto("22")}><img src="/img/publicidad/productos/banner-microsoft.jpg" alt="img" width="100%" height="100%"></img></div>
                                <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/productos/empaquez.jpg" alt="img" width="100%" height="100%"></img></div>
                                <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/productos/proteccion_web.jpg" alt="img" width="100%" height="100%"></img></div>
                                <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/productos/venta_cuyes.jpg" alt="img" width="100%" height="100%"></img></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="principal_lateral">
                    <div className="principal3_publicidad">
                        <div className="principal3_publicidad_lista_lateral sliderVerticalAnimacionInvert">                    
                            <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/cartas/sumaq.jpg" alt="img" width="100%" height="100%"></img></div>
                            <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/cartas/nattys.jpg" alt="img" width="100%" height="100%"></img></div>
                            <div onClick={()=>this.buscarProducto("23")}><img src="/img/publicidad/cartas/munaycha.jpg" alt="img" width="100%" height="100%"></img></div>
                            <div onClick={()=>this.buscarProducto("22")}><img src="/img/publicidad/cartas/chifa.jpg" alt="img" width="100%" height="100%"></img></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Principal;
/*



<div className="Principal2">
    <div className="centrado">
        <ul>
            <li><img src="/img/publicidad/killa_burger.png" alt="img" width="100%" height="100%"></img></li>
            <li><img src="/img/publicidad/proteccion_web.jpg" alt="img" width="100%" height="100%"></img></li>
            <li><img src="/img/publicidad/banner-microsoft.jpg" alt="img" width="100%" height="100%"></img></li>
        </ul>
        <div className="principal2_publicidad">
            <div onClick={()=>this.buscarProducto("20")}><img src="/img/publicidad/killa_burger.png" alt="img" width="100%" height="100%"></img></div>
            <div onClick={()=>this.buscarProducto("21")}><img src="/img/publicidad/proteccion_web.jpg" alt="img" width="100%" height="100%"></img></div>
            <div onClick={()=>this.buscarProducto("22")}><img src="/img/publicidad/banner-microsoft.jpg" alt="img" width="100%" height="100%"></img></div>
        </div>
    </div>
</div>




import IconoLupa from '../../SVG/IconoLupa';
import IconoMercado from '../../SVG/IconoMercado';

    render_(){
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

*/