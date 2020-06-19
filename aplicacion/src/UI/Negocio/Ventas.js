/*
-- Description:     PAGINA PRINCIPAL DE VENTAS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* FUNCIONES */
import { obtenerUsuario } from '../../Componentes/Funciones';

/* ICONOS */
import IconoMenu from '../../SVG/aplicacion/IconoMenu';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:{
        ventasNegocio:[],
    },
};

export class NegocioVentas extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    iniciarFunciones =()=> {
    }

    componentDidMount(){
        var usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){ 
            this.setState({usuarioAplicacion},()=>this.iniciarFunciones())
        } else {}
    }
    
    render(){
        return(
            <div className="NegocioVentas">
                <div className="usuario_encabezado">
                    <div className="usuario_encabezado_menu" onClick={this.props.controlMenuUsuario}><IconoMenu/></div>
                    <label> Ventas Registradas </label>
                    <div onClick={this.props.history.goBack}></div>
                </div>
            </div>
        )
    }
}

export default NegocioVentas;
