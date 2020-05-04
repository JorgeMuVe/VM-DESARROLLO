/*
-- Description:      PAGINA PRINCIPAL DE USUARIO DE TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {
};

export class Usuario extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    render(){
        if(this.props.paginaActual==='usuario'){
            const { usuarioAplicacion }= this.props;
            return(
                <div className="Producto">
                    <div className="producto_tipo"
                        onClick={()=>this.props.cambiarPagina('ingresar-cliente')}
                        hidden={usuarioAplicacion.tipoUsuario !=="invitado"}
                    > <div className="producto_tipo_boton"> Ingresar al Sistema </div> </div>
    
                    <div className="producto_tipo"
                        onClick={()=>this.props.cambiarPagina('registroUsuario')}
                        hidden={usuarioAplicacion.tipoUsuario !=="invitado"}
                    > <div className="producto_tipo_boton"> Registrate</div> </div>
    
                    <div className="producto_tipo"
                        onClick={()=>this.props.cambiarPagina('productoLista-verduras')}
                        hidden={usuarioAplicacion.tipoUsuario !== "cliente"}
                    > <div className="producto_tipo_boton"> 
                        {"Configurar Cuenta (" + usuarioAplicacion.nombreCompleto + ")"}
                    </div> </div>
    
                    <div className="producto_tipo"
                        hidden={usuarioAplicacion.tipoUsuario !=="cliente"}
                        onClick={()=>this.props.cambiarPagina('productoLista-carnes')}
                    > <div className="producto_tipo_boton"> Mis Direcciones </div> </div>
    
                    <div className="producto_tipo"
                        hidden={usuarioAplicacion.tipoUsuario !== "cliente"}
                        onClick={()=>this.props.cambiarPagina('productoLista-lacteos')}
                    > <div className="producto_tipo_boton"> Mis Pedidos </div> </div>
                    
                    <div className="producto_tipo"
                        hidden={usuarioAplicacion.tipoUsuario !== "negocio"}
                        onClick={()=>this.props.cambiarPagina('productoLista-misProductos')}
                    > <div className="producto_tipo_boton"> Mis Productos </div> </div>
    
                    <div className="producto_tipo"
                        hidden={usuarioAplicacion.tipoUsuario !== "negocio"}
                        onClick={()=>this.props.cambiarPagina('productoLista-misOfertas')}
                    > <div className="producto_tipo_boton"> Mis ofertas </div> </div>
                </div>
            )
        } else { return null}
    }
}

export default Usuario;
