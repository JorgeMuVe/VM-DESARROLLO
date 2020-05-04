/*
-- Description:     PAGINA PRINCIPAL DE USUARIO NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Negocio extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    redireccionar = (ruta) => { this.props.history.push(ruta) }

    componentDidMount(){
        const { usuarioAplicacion } = this.props;
        console.log(usuarioAplicacion);
        if(usuarioAplicacion.tipoUsuario!=="negocio"){
            this.redireccionar('/ingresar/negocio')
        }
    }

    render(){
        return(
            <div className="Negocio">
                <div className="boton_principal">
                    Mis Productos
                </div>
                <div className="boton_principal">
                    Mis ofertas
                </div>
                <div className="boton_principal">
                    Ingresos
                </div>
            </div>
        )
    }
}

export default Negocio;
