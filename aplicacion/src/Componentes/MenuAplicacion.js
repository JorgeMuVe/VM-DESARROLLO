/* COMPONENTES */
import React from 'react';

/***   ICONOS   ***/
import IconoGoogle from '../SVG/IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class MenuAplicacion extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    redireccionar =(ruta)=>{ window.location.href = ruta }
    
    render(){ // paginaActualCliente,cambiarPaginaCliente
        if(this.props.mostrarMenuAplicacion){
            return(
                <div className="MenuAplicacion">
                    <div className="menu_aplicacion">
                        <div className="menu_aplicacion_opciones">
                            <div className="usuario_navegador">
                                <div className={"usuario_navegador_boton"}
                                    onClick={()=>this.redireccionar("/")}>
                                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                                    <label>Inicio</label>
                                </div>
                                <div className={"usuario_navegador_boton"}
                                    onClick={()=>this.redireccionar("/productos/lista")}>
                                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                                    <label>Productos</label>
                                </div>
                                <div className={"usuario_navegador_boton"}
                                    onClick={()=>this.redireccionar("/#tiendas")}>
                                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                                    <label>Tiendas</label>
                                </div>
                                <div className={"usuario_navegador_boton"}
                                    onClick={()=>this.redireccionar("/#envios")}>
                                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                                    <label>Envio</label>
                                </div>
                                <div className={"usuario_navegador_boton"}
                                    onClick={()=>this.redireccionar("/#contacto")}>
                                    <div className="centrado"> <IconoGoogle fill="#d1d3d8"/> </div>
                                    <label>Contacto</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else { return null}
    }
}

export default MenuAplicacion;