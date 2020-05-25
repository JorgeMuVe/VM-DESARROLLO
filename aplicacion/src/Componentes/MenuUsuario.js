/* COMPONENTES */
import React from 'react';
import MenuCliente from '../Componentes/MenuCliente';
import MenuNegocio from '../Componentes/MenuNegocio';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class MenuUsuario extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    mostrarMenu =()=> {
        const {usuarioAplicacion} = this.props;
        if(usuarioAplicacion){
            switch (usuarioAplicacion.tipoUsuario) {
                case 'cliente': 
                    return <MenuCliente
                        controlMenuUsuario={this.props.controlMenuUsuario}
                        salirSistema={this.props.salirSistema}/>
                case 'negocio': 
                    return <MenuNegocio
                        controlMenuUsuario={this.props.controlMenuUsuario}
                        salirSistema={this.props.salirSistema}/>
                default: break;
            }
        }
    }
    
    render(){
        if(this.props.mostrarMenuUsuario){
            return(            
                <div className="MenuUsuario">
                    <div className="menu_usuario">
                        <div className="menu_usuario_opciones">
                            {this.mostrarMenu()}
                        </div>
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default MenuUsuario;