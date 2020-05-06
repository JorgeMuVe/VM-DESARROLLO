/*
-- Description:      MENU DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* IMPORT SVG */
import IconoMenu from '../SVG/IconoMenu';
import IconoNotificacion from '../SVG/IconoNotificacion';
import IconoSinNotificacion from '../SVG/IconoSinNotificacion';

import IconoUsuario from '../SVG/IconoUsuario';
import IconoMercado from '../SVG/IconoMercado';
import IconoPedidoMenu from '../SVG/IconoPedidoMenu';
import IconoPedidos from '../SVG/IconoPedidos';
import IconoDireccion from '../SVG/IconoDireccion';
import IconoVentas from '../SVG/IconoVentas';

/* VARIABLES GLOBALES */
const estadoInicial = {
    tema : 0, // Tema Seleccionado
    menu : false, // Abrir - Cerrar Menu,
    usuario: 'Usuario Invitado',
};

export class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    seleccionarTema = (evento) => {
        var temaSeleccionado = evento.target.value;
        var tema = 'tema_claro';

        switch (temaSeleccionado) {
            case 1:tema='tema_verde';break;
            case 2:tema='tema_oscuro';break;
            default:tema='tema_claro';break;
        }
        this.setState({tema});
    }

    abrirMenu = () => { this.setState({menu:!this.state.menu}) }

    cambiarPagina = (nombrePagina) => {
        this.props.cambiarPagina(nombrePagina);
    }

    render(){
        return(
            <div className="Menu">
                <div className="logo_aplicacion centrado">
                    <img src={this.props.urlAplicacion + "/vinocanchon.png"} alt="Logo Negocio"/>
                </div>
                <div className="barra_herramientas">
                    <div className="barra_herramientas_titulo">
                        <div className="centrado"> MERCADO VIRTUAL </div>
                    </div>
                    <div className="barra_herramientas_items">
                        <div> {(this.props.notificaciones||[]).length>0?<IconoNotificacion/>:<IconoSinNotificacion/>} </div>
                        <div> <IconoMenu/> </div>
                    </div>
                </div>
                <div className="barra_lateral">
                    <div className="barra_lateral_items">
                        <div hidden={false} 
                            onClick={()=>this.cambiarPagina("usuario")} 
                            className="boton_barra_lateral">
                            <div className=""><IconoUsuario/></div>
                            <div className="">{true?"Inicar Sesion":"Nombre Usuario"}</div>
                        </div>

                        <div hidden={false} 
                            onClick={()=>this.cambiarPagina("usuario")} 
                            className="boton_barra_lateral">
                            <div className=""><IconoMercado/></div>
                            <div className="">Mercados</div>
                        </div>

                        <div hidden={false} 
                            onClick={()=>this.cambiarPagina("usuario")} 
                            className="boton_barra_lateral">
                            <div className=""><IconoPedidoMenu/></div>
                            <div className="">Pedido</div>
                        </div>

                        <div hidden={false} 
                            onClick={()=>this.cambiarPagina("usuario")} 
                            className="boton_barra_lateral">
                            <div className=""><IconoPedidos/></div>
                            <div className="">Pedidos</div>
                        </div>

                        <div hidden={false} 
                            onClick={()=>this.cambiarPagina("usuario")} 
                            className="boton_barra_lateral">
                            <div className=""><IconoDireccion/></div>
                            <div className="">Mis direcciones</div>
                        </div>

                        <div hidden={false} 
                            onClick={()=>this.cambiarPagina("usuario")} 
                            className="boton_barra_lateral">
                            <div className=""><IconoMercado/></div>
                            <div className="">Mis productos</div>
                        </div>

                        <div hidden={false} 
                            onClick={()=>this.cambiarPagina("usuario")} 
                            className="boton_barra_lateral">
                            <div className=""><IconoVentas/></div>
                            <div className="">Mis Ventas</div>
                        </div>
                    </div>
                </div>
                <div className="cuepo_aplicacion">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Menu;