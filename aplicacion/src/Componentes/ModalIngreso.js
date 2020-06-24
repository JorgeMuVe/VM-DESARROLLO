/****** COMPONENTES ******/
import React from 'react';
import {withRouter} from 'react-router';
import { GoogleLogin } from 'react-google-login';

/***** ICONO SVG *******/
import IconoUsuario from '../SVG/IconoUsuario';
import IconoContrasena from '../SVG/IconoContrasena';
import IconoDNIRegistro from '../SVG/IconoDNIRegistro';
import IconoTelefonoRegistro from '../SVG/IconoTelefonoRegistro';

import IconoFacebook from '../SVG/IconoFacebook';
import IconoGoogle from '../SVG/IconoGoogle';
import IconoTwitter from '../SVG/IconoTwitter';


/****** FUNCIONES *****/
import { ingresarSistema_DB, agregarUsuario_DB} from '../DB/usuarioDB';

/* VARIABLES GLOBALES */
const estadoInicial = {
    tipoUsuario:'cliente',
    tipoAccion:true
};

export class ModalIngreso extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    responseGoogle = (response) => {
        console.log(response);
        if(response){
            this.agregarUsuarioGoogle(response);
        }
    }

    /* DATOS Y REGISTRO DE USUARIO*/
    agregarUsuarioGoogle = (response) => {
        var nuevoUsuario = {
            registroNacional: '',
            nombreCompleto: response.profileObj.givenName,
            apellidoPaterno: response.profileObj.familyName,
            apellidoMaterno: '',
            telefonoCliente: '',
            nombreUsuario: response.profileObj.email,
            contrasena: response.profileObj.googleId,
            tipoUsuario: 'cliente'

        };   
        agregarUsuario_DB(nuevoUsuario).then(res => {
            if (!res.error) {
                this.setState({ usuarioAplicacion: res }, () => {
                    sessionStorage.setItem('usuarioAplicacion',JSON.stringify(res));
                    this.props.history.push("/usuario/"+res.tipoUsuario+"/_");
                    this.props.ingresarSistema(res);
                });
            } else { this.props.abrirMensajeError(4000, res.error) }
        })
    }
    
    /* INGRESAR AL SISTEMA */
    ingresarSistema = (usuarioIngreso) => {
        ingresarSistema_DB(usuarioIngreso).then(res => {
            if (!res.error) {
                sessionStorage.setItem('usuarioAplicacion',JSON.stringify(res));
                this.props.history.push('/usuario/'+res.tipoUsuario+"/_");
                this.props.ingresarSistema(res);
            } else { this.props.abrirMensajeError(4000, res.error); }
        });
    }
    
    ingresarSistemaBoton =(evento)=> {
        evento.preventDefault();
        const usuarioIngreso = {};
        usuarioIngreso["nombreUsuario"] = document.getElementById("nombreUsuario").value;
        usuarioIngreso["contrasena"] = document.getElementById("contrasena").value;
        usuarioIngreso["tipoUsuario"] = this.state.tipoUsuario;
        //usuarioIngreso["codigoUsuario"] = localStorage.getItem("codigoUsuario")||0;
        this.ingresarSistema(usuarioIngreso);
    }

    cambiarTipoUsuario =(tipoUsuario)=> {
        this.setState({tipoUsuario})
    }
    
    cambiarAccion = () => {
        this.setState({tipoAccion:!this.state.tipoAccion});
        let z = document.getElementById('btn');
        const { tipoAccion } = this.state;
        if(tipoAccion){ z.style.left='120px';}
        else { z.style.left='0px'; }
    }

    render(){
        if(this.props.mostrarModalIngreso){
        return(
        <div className="ModalIngreso">
            <form className="modal_ingreso" validate="true" onSubmit={this.ingresarSistemaBoton}>
                <div className="modal_ingreso_tipo_cuadro">
                    <div id="btn"></div>
                    <button type="button" className={this.state.tipoAccion?"toggle-btn-activo":"toggle-btn "} onClick={this.cambiarAccion}>Ingresar</button>
                    <button type="button" className={this.state.tipoAccion?"toggle-btn":"toggle-btn-activo"} onClick={this.cambiarAccion}>Registro</button>
                </div>

                <div className="modal_ingreso_internet">
                    <div className="ingreso_internet_boton" style={{backgroundColor:'#4267B2'}}>
                        <div className="centrado"><IconoFacebook fill="#fff"/></div>
                    </div>
                    <div className="ingreso_internet_boton" style={{backgroundColor:'#00aced'}}>
                        <div className="centrado"><IconoTwitter fill="#fff"/></div>
                    </div>
                
                    <GoogleLogin
                        clientId="863857254472-bi855s65oh0llnm47g2n5c1e8e9j37e8.apps.googleusercontent.com"
                        render={renderProps => (
                            <div disabled={renderProps.disabled} onClick={renderProps.onClick} className="ingreso_internet_boton" style={{backgroundColor:'#b63a2b'}}>
                                <div className="centrado"><IconoGoogle fill="#fff"/></div>
                            </div>
                        )}
                        buttonText="Login"
                        onSuccess={()=>this.responseGoogle}
                        onFailure={()=>this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                {this.state.tipoAccion?
                <div className="modal_ingreo_datos">
                    <div><IconoUsuario fill="#d1d3d8"/><input required id="nombreUsuario" type="text" placeholder="Usuario o Correo"/></div>
                    <div><IconoContrasena fill="#d1d3d8"/><input required id="contrasena" type="password" placeholder="Contraseña"/></div>
                    <label><input type="checkbox"/>Recordar Contraseña</label>
                    <label><a href="/registro">Olvido su contraseña?</a></label>
                </div>:
                <div>
                    <div className={"centrado " + (this.state.mostrarConfirmar ? "ocultar" : "")}>
                    <form className="registroDatos" validate="true" onSubmit={this.pasarConfirmacion}>
                        <div className="nombresRegistro">
                            <span><IconoUsuario /></span>
                            <input className="inNombresRegistro" required id="nombreCompleto" placeholder="Nombres" />
                        </div>
                        <div className="ApPatRegistro">
                            <span><IconoUsuario /></span>
                            <input className="inApPatRegistro" required id="apellidoPaterno" placeholder="Apellido Paterno" />
                        </div>
                        <div className="ApMatRegistro">
                            <span><IconoUsuario /></span>
                            <input className="inApMatRegistro" required id="apellidoMaterno" placeholder="Apellido Materno" />
                        </div>
                        <div className="dniRegistro">
                            <span><IconoDNIRegistro /></span>
                            <input className="inDNIRegistro" required id="registroNacional" placeholder="DNI" />
                        </div>
                        <div className="telefonoRegistro">
                            <span><IconoTelefonoRegistro /></span>
                            <input className="inTelefonoRegistro" required id="telefonoCliente" type="text" placeholder="Telefono" />
                        </div>
                        <div>
                            <input required type="checkbox" className="terminosRegistro" />
                            <span> Acepto <a href="##" target="_blank"> Términos y Condiciones </a> y la <a href="##" target="_blank">Política de Privacidad y Tratamiento de Datos Personales</a> </span>
                        </div>
                        <div>
                            <input type="checkbox" className="UsoInfoRegistro" />
                            <span> Acepto el uso de mi información para <a href="##" target="_blank">fines promocionales</a> <br /></span>
                        </div>
                        <hr></hr>
                    </form>
                </div>
                </div>}

                <div className="modal_ingreso_opciones">
                    <div className="centrado">
                        <button className="modal_ingreso_opciones_ingresar" type="submit">{this.state.tipoAccion?"INGRESAR":"REGISTRO"}</button>
                    </div>
                    <div className="centrado">
                        <button className="modal_ingreso_opciones_salir" onClick={this.props.controlModalIngreso}> SALIR </button>
                    </div>
                </div>
            </form>
        </div> 
        ) } else { return null }
    }
}

export default withRouter(ModalIngreso);