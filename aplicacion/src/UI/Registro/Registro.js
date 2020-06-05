/*
-- Description:      Pantalla de Registro de Usuario de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import DatosUsuario from './Datos';
import ConfirmarRegistro from './Confirmar';

/* FUNCIONES */
import { agregarUsuario_DB } from '../../DB/usuarioDB';

/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarConfirmar:false,
};

export class Registro extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    /* VERIFICACION */
    verificarDatosUsuario = (nuevoUsuario) => {
        if (nuevoUsuario) { return true } else { return false }
    }

    /* DATOS Y REGISTRO DE USUARIO*/
    agregarUsuario = () => {
    var nuevoUsuario = {
      registroNacional: document.getElementById("registroNacional").value,
      nombreCompleto: document.getElementById("nombreCompleto").value,
      apellidoPaterno: document.getElementById("apellidoPaterno").value,
      apellidoMaterno: document.getElementById("apellidoMaterno").value,
      nombreUsuario: document.getElementById("nombreUsuario").value,
      contrasena: document.getElementById("contrasena").value,
      tipoUsuario: "cliente"
    };

    if (this.verificarDatosUsuario(nuevoUsuario)) {
      agregarUsuario_DB(nuevoUsuario).then(res => {
        if (!res.error) {
          this.setState({ usuarioAplicacion: res }, () => {
            sessionStorage.setItem('codigoUsuario', res.codigoUsuario);
            this.props.history.push("/usuario/cliente/_");
            this.props.ingresarSistema(res);
          });
        } else { this.props.abrirMensajeError(4000, res.error); }
      }) //.catch(res => alert("Error"));
    } else { this.abrirMensajeError(4000, 'DATOS INCOMPLETOS') }
  }

    cambiarPagina =(confirmar)=> {
        if(this.state.mostrarConfirmar && confirmar){
            this.agregarUsuario();   
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
