/*
-- Description:      Pantalla de Registro de Usuario de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';


/* VARIABLES GLOBALES */
const estadoInicial = {
    error:false,
    mensaje:''
};

export class Ingreso extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    verificarDatos = () => {
        var { tipoUsuario } = this.props;
        var correoUsuario = document.getElementById("correoUsuario").value;
        var contrasenaUsuario = document.getElementById("contrasenaUsuario").value;
    
        if(correoUsuario.length < 1 || contrasenaUsuario.length < 1){
            this.setState({mensaje:'ERROR: Datos Incompletos',error:true},()=>{
                setTimeout(this.setState.bind(this,estadoInicial),5000) 
            });
        }else {
            this.props.ingresarSistema(tipoUsuario);
        }
    }

    componentDidMount(){
    }

    render() {
        return (
            <div className="Ingreso">
                <div className="centrado">
                    <div className="ingreso_encabezado">
                        <button onClick={()=>this.props.cambiarPagina("principal")}>{"<"}</button>
                        <div> {"INGRESO AL SISTEMA"} </div>
                    </div>
                </div>
                <div className={"centrado " + (this.state.error ? "" : "ocultar")}>
                    <div> {this.state.mensaje} </div>
                </div>
                <div className={"centrado " + (this.props.error ? "ocultar" : "")}>
                    <div className="ingreso_datos">
                        <input type="text" placeholder="Correo de usuario" id="correoUsuario"/>
                        <input type="password" placeholder="Contraseña" id="contrasenaUsuario"/>
                    </div>
                </div>
                <div className="centrado">
                    <button className="ingreso_siguiente" onClick={() => this.verificarDatos()}>
                        {"Ingresar >"}
                    </button>
                </div>
                <div className="centrado">
                    <button
                        hidden={this.props.tipoUsuario==="tienda"}
                        onClick={()=>this.props.cambiarPagina("registro")}
                    > Registro </button>
                </div>
            </div>
        )
    }
}

export default Ingreso;
