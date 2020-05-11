/*
-- Description:     PAGINA PRINCIPAL DE USUARIO CLIENTE
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Producto extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    
    render(){
        return(
            <div className="ProductoLista">
                <div className="centrado">
                    <div className="producto_lista">
                        <div className="producto_lista_tipo" onClick={()=>{} }>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/fondos/verduras.jpg" alt="Fondo Tipo Producto"/>
                                <div>Verduras y Carnes</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{} }>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/fondos/verduras.jpg" alt="Fondo Tipo Producto"/>
                                <div>Lacteos y Embutidos</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{} }>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/fondos/verduras.jpg" alt="Fondo Tipo Producto"/>
                                <div>Ropa y Zapatillas</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{} }>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/fondos/verduras.jpg" alt="Fondo Tipo Producto"/>
                                <div>Comidas y Bebidas</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{} }>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/fondos/verduras.jpg" alt="Fondo Tipo Producto"/>
                                <div>Aseo y Limpieza</div>
                            </div> 
                        </div>

                        <div className="producto_lista_tipo" onClick={()=>{} }>
                            <div className="producto_lista_tipo_boton">
                                <img src="/img/fondos/verduras.jpg" alt="Fondo Tipo Producto"/>
                                <div>Servicios y Ofertas</div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Producto;
