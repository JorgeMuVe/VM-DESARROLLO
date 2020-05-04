/*
-- Description:      Pantalla de Registro de Usuario de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import DatosUsuario from './Datos';
import ConfirmarRegistro from './Confirmar';


/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarConfirmar:false,
};

export class Registro extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    cambiarPagina =(confirmar)=> {
        if(this.state.mostrarConfirmar && confirmar){
            //this.props.actualizarUsuario("Usuario Registrado");
            //console.log("Se confirma Registro");
            this.props.agregarUsuario();   
        }else{
            this.setState({mostrarConfirmar:!this.state.mostrarConfirmar});
        }
    }

    render(){
        var { mostrarConfirmar } = this.state;
        return(
            <div className="Registro">
                <div className="barra_herramientas_encabezado">
                    <button onClick={()=>this.cambiarPagina()}>{this.state.mostrarConfirmar?"<":">"}</button>
                    <div className="barra_herramientas_titulo">
                        {this.state.mostrarConfirmar?"Confirmanos":"Regístrate"}
                    </div>
                </div>
                <div className={"centrado " + (mostrarConfirmar?"ocultar":"")}> 
                    <DatosUsuario/> 
                </div>
                <div className={"centrado " + (mostrarConfirmar?"":"ocultar")}> 
                    <ConfirmarRegistro/> 
                </div>
                <div className="registro_siguiente">
                    <button onClick={()=>this.cambiarPagina(true)}>
                        {this.state.mostrarConfirmar?"Confirmar >":"Registrarme >"}
                    </button>
                </div>
            </div>
        )
    }
}

export default Registro;
