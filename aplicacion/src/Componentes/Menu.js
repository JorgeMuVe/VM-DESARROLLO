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
                <div className="logo_aplicacion">MERCADO VIRTUAL</div>
                <div className="barra_herramientas">
                    <div className="barra_herramientas_titulo">
                        <div className="centrado"> MERCADO VIRTUAL </div>
                    </div>
                    <div className="barra_herramientas_items">
                        <div> {(this.props.notificaciones||[]).length>0?<IconoNotificacion></IconoNotificacion>:<IconoSinNotificacion></IconoSinNotificacion>} </div>
                        <div> <IconoMenu></IconoMenu> </div>
                    </div>
                </div>
                <div className="barra_lateral">
                    <div className="barra_lateral_items">
                        <div>Menu 1</div>
                        <div>Menu 2</div>
                        <div>Menu 3</div>
                        <div>Menu 4</div>
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