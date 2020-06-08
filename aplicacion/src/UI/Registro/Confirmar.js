/*
-- Description:      Componente de Datos de Usuario TIENDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* FUNCIONES */
import { agregarUsuario_DB } from '../../DB/usuarioDB';

/* VARIABLES GLOBALES */
const estadoInicial = {
    usuarioAplicacion:{},
};

export class ConfirmarRegistro extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    /* DATOS Y REGISTRO DE USUARIO*/
    agregarUsuario = (evento) => {
        evento.preventDefault();
        const { nuevoUsuario } = this.state;
        var contrasena = document.getElementById("contrasena").value;
        var confirmarContrasena = document.getElementById("confirmarContrasena").value;

        if(contrasena === confirmarContrasena){
            nuevoUsuario["nombreUsuario"] = document.getElementById("nombreUsuario").value;
            nuevoUsuario["contrasena"]= document.getElementById("contrasena").value;
            nuevoUsuario["tipoUsuario"]="cliente";
            agregarUsuario_DB(nuevoUsuario).then(res => {
                if (!res.error) {
                this.setState({ usuarioAplicacion: res }, () => {
                    sessionStorage.setItem('codigoUsuario', res.codigoUsuario);
                    this.props.history.push("/usuario/cliente/_");
                    this.props.ingresarSistema(res);
                });
                } else { this.props.abrirMensajeError(4000, res.error) }
            })
        } else { this.props.abrirMensajeError(4000, "Contraseñas no coinciden!!") }
    }

    componentDidMount(){
        const { nuevoUsuario } = this.props;
        console.log(nuevoUsuario);
        if(nuevoUsuario){ this.setState({ nuevoUsuario }) } 
        else { this.props.history.push("/registro") }
    }

    render(){
        return(
            <div className="centrado">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Regístrate </label>
                    <div></div>
                </div>
                <form className="registro_confirmacion" validate="true" onSubmit={this.agregarUsuario}>
                    <div>Hola <b>{this.state.usuarioAplicacion.nombreCliente}</b>, Un paso más!</div>
                    <div>
                        Ingresa los datos para tu cuenta nueva.
                    </div>
                    <input required style={{width:'250px'}} id="nombreUsuario" placeholder="Correo" type='email'/>
                    <input required style={{width:'250px'}} id="contrasena" placeholder="Contraseña" type='password'/>
                    <input required style={{width:'250px'}} id="confirmarContrasena" placeholder="Confirma Contraseña" type='password'/>
                    <div className="centrado">
                        <button type="submit">Confirmar</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ConfirmarRegistro;
