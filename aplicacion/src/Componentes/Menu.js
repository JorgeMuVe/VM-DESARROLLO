/*
-- Description:      MENU DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* IMPORT SVG */
import IconoMenu from '../SVG/IconoMenu';
import IconoVenta from '../SVG/IconoVenta';
import IconoPedido from '../SVG/IconoPedido';
import IconoUsuario from '../SVG/IconoUsuario';
import IconoProducto from '../SVG/IconoProducto';
import IconoDireccion from '../SVG/IconoDireccion';

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
        this.setState({menu:false})
        this.props.cambiarPagina(nombrePagina);
    }

    render(){
        return(
            <div className="Menu">
                <input type="checkbox" id="toggle_menu" checked={this.state.menu} onChange={()=>this.abrirMenu()}/>
                <label htmlFor="toggle_menu" className="button_menu">
                    <IconoMenu></IconoMenu>
                </label>
                <nav className="nav_menu">
                    <div className=""
                        onClick={()=>this.cambiarPagina(
                            this.props.usuarioAplicacion.tipoUsuario==="negocio"?"producto-negocio":"producto-cliente"
                        )}>
                        <IconoProducto></IconoProducto>
                    </div>
                    <div className=""
                        hidden={this.props.usuarioAplicacion.tipoUsuario==="negocio"} 
                        onClick={()=>this.cambiarPagina('pedido')}>
                        <IconoPedido></IconoPedido>
                    </div>
                    <div className=""
                        hidden={this.props.usuarioAplicacion.tipoUsuario!=="negocio"} 
                        onClick={()=>this.cambiarPagina('direccion')}>
                        <IconoDireccion></IconoDireccion>
                    </div>
                    <div className=""
                        hidden={this.props.usuarioAplicacion.tipoUsuario!=="negocio"}  
                        onClick={()=>this.cambiarPagina('venta')}>
                        <IconoVenta></IconoVenta>
                    </div>
                    <div onClick={()=>this.cambiarPagina('usuario')}>
                        <IconoUsuario></IconoUsuario>
                    </div>
                </nav>
                <div className="paginas">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Menu;