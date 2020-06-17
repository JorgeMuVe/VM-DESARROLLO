/* COMPONENTES */
import React from 'react';

import IconoSupermercado from '../../SVG/IconoPedido';


/* VARIABLES GLOBALES */
const estadoInicial = {
    publicaciones1:[
        {imagen:"/img/publicidad/comidas/burger.png",nombreProducto:'Burger'},
        {imagen:"/img/publicidad/comidas/ceviche.jpg",nombreProducto:'ceviche'},
        {imagen:"/img/publicidad/comidas/fastfood.jpg",nombreProducto:'fastfood'},
        {imagen:"/img/publicidad/comidas/pollo.jpg",nombreProducto:'pollo'}
    ],
    publicaciones2:[
        {imagen:"/img/publicidad/productos/banner-microsoft.jpg",nombreProducto:'microsoft'},
        {imagen:"/img/publicidad/productos/empaquez.jpg",nombreProducto:'empaquez'},
        {imagen:"/img/publicidad/productos/proteccion_web.jpg",nombreProducto:'proteccion_web'},
        {imagen:"/img/publicidad/productos/venta_cuyes.jpg",nombreProducto:'venta_cuyes'}
    ],
};

export class Principal extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    cambiarCiudad =()=> {
        var nombreCiudad = document.getElementById('nombreCiudad').value;
        this.props.cambiarCiudad(nombreCiudad);
    }

    buscarProducto =()=> {
        var productoSeleccionado={
            nombreProducto:"Nuevo"
        };
        this.props.seleccionarProductoCantidad(productoSeleccionado);
    }

    publicidadCentral1() {
        const { publicaciones1 } = this.state;
        for(let j=0;j<publicaciones1.length;j++){
            setTimeout(() =>{
                if(this.props.history.location.pathname === "/"){
                    document.getElementById('imagenPublicidad1').src=(publicaciones1[j].imagen)||"";
                    document.getElementById('imagenPublicidad1').style.opacity=1;
                    if(j===publicaciones1.length-1) setTimeout(()=> this.publicidadCentral1(),2000);
                }
            },j*2000);
        }
    }

    publicidadCentral2() {
        const { publicaciones2 } = this.state;
        for(let j=0;j<publicaciones2.length;j++){
            setTimeout(() =>{
                if(this.props.history.location.pathname === "/"){
                    document.getElementById('imagenPublicidad2').src=(publicaciones2[j].imagen)||"";
                    document.getElementById('imagenPublicidad2').style.opacity=1;
                    if(j===publicaciones2.length-1) setTimeout(()=> this.publicidadCentral2(),2000);
                }
            },j*2000);
        }
    }

    componentDidMount(){
        this.publicidadCentral1();
        this.publicidadCentral2();
    }

    render(){
        return(
            <div className="Principal3">
                <div className="principal_lateral">{/*Publicidad Lateral*/}</div>
                <div className="PrincipalCentral">
                    <div className="principal_central">
                        <div className="centrado">
                            <div className="principal_central_opciones">
                                <div><IconoSupermercado fill="#fff"/><label>Fácil, rápido y seguro. <a href="##"> Cómo comprar</a></label></div>
                                <span className="centrado"><span className="linea_vertical"></span></span>
                                <div><IconoSupermercado fill="#fff"/><label>Información de medidas de Seguridad y Saneamiento. <a href="##"> Saber más</a></label></div>
                                <span className="centrado"><span className="linea_vertical"></span></span>
                                <div><IconoSupermercado fill="#fff"/><label>Paga con crédito o débito. <a href="##"> Ver promociones</a></label></div>
                                <span className="centrado"><span className="linea_vertical"></span></span>
                                <div><IconoSupermercado fill="#fff"/><label>Ayuda y seguimiento en tu pedido. <a href="##"> Centro de ayuda</a></label></div>
                            </div>
                        </div>
                        <div onClick={()=>this.buscarProducto()}>
                            <img alt="Imagen Publicidad" id="imagenPublicidad1" width="100%" height="100%"/>
                        </div>
                        <div onClick={()=>this.buscarProducto()}>
                            <img alt="Imagen Publicidad" id="imagenPublicidad2" width="100%" height="100%"/>
                        </div>
                    </div>
                </div>
                <div className="principal_lateral">{/*Publicidad Lateral*/}</div>
            </div>
        )
    }
}

export default Principal;
/*
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
*/