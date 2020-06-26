/****** COMPONENTES ******/
import React from 'react';
import {withRouter} from 'react-router';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

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
    tipoAccion:true,
    mostrarConfirmar:false,
    nuevoUsuario:{}
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
        console.log(nuevoUsuario);
        //agregarUsuario_DB(nuevoUsuario).then(res => {
        //    if (!res.error) {
        //        this.setState({ usuarioAplicacion: res }, () => {
        //            sessionStorage.setItem('usuarioAplicacion',JSON.stringify(res));
        //            this.props.history.push("/usuario/"+res.tipoUsuario+"/_");
        //            this.props.ingresarSistema(res);
        //        });
        //    } else { this.props.abrirMensajeError(4000, res.error) }
        //})
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

    cambiarConfirmacion =(evento)=> {
        evento.preventDefault();
        var nuevoUsuario = {
            registroNacional: document.getElementById("registroNacional").value,
            nombreCompleto: document.getElementById("nombreCompleto").value,
            apellidoPaterno: document.getElementById("apellidoPaterno").value,
            apellidoMaterno: document.getElementById("apellidoMaterno").value,
            telefonoCliente: document.getElementById("telefonoCliente").value
        };
        this.setState({mostrarConfirmar:true,nuevoUsuario})//,()=>document.getElementById('form_confirmacion').reset())
    }

    agregarUsuario =(evento)=> {
        evento.preventDefault();
        const { nuevoUsuario } = this.state;
        var contrasena = document.getElementById("contrasena").value;
        var confirmarContrasena = document.getElementById("confirmarContrasena").value;
        var nombreUsuario = document.getElementById("nombreUsuario").value;
        if (contrasena === confirmarContrasena) {
            nuevoUsuario["nombreUsuario"] = nombreUsuario;
            nuevoUsuario["contrasena"] = contrasena;
            nuevoUsuario["tipoUsuario"] = "cliente";
            agregarUsuario_DB(nuevoUsuario).then(res => {
                if (!res.error) {
                    sessionStorage.setItem('usuarioAplicacion',JSON.stringify(res));
                    this.props.history.push('/usuario/'+res.tipoUsuario+"/_");
                    this.props.ingresarSistema(res);
                } else { this.props.abrirMensajeError(4000, res.error) }
            })
        } else { this.props.abrirMensajeError(4000, "Contraseñas no coinciden!!") }
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
            <div className="modal_ingreso">
                <div className="modal_ingreso_tipo_cuadro">
                    <div id="btn"></div>
                    <button type="button" className={this.state.tipoAccion?"toggle-btn-activo":"toggle-btn "} onClick={this.cambiarAccion}>Ingresar</button>
                    <button type="button" className={this.state.tipoAccion?"toggle-btn":"toggle-btn-activo"} onClick={this.cambiarAccion}>Registro</button>
                </div>

                <div className="modal_ingreso_internet">
                    <FacebookLogin
                        appId="724713238280233"
                        autoLoad={false}
                        callback={this.responseFacebook}
                        render={renderProps => (
                            <div onClick={renderProps.onClick} className="ingreso_internet_boton" style={{backgroundColor:'#4267B2'}}>
                        <div className="centrado"><IconoFacebook fill="#fff"/>
                            </div>
                        </div>
                    )}/>

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
                <form id="form_ingreso" cvalidate="true" onSubmit={this.ingresarSistemaBoton} className="modal_ingreso_datos">
                    <div className="modal_ingreso_cuadro"><IconoUsuario fill="#d1d3d8"/><input required id="nombreUsuario" type="text" placeholder="Usuario o Correo"/></div>
                    <div className="modal_ingreso_cuadro"><IconoContrasena fill="#d1d3d8"/><input required id="contrasena" type="password" placeholder="Contraseña"/></div>
                    <label><input type="checkbox"/>Recordar Contraseña</label>
                    <label><a href="/registro">Olvido su contraseña?</a></label>
                    <div className="centrado">
                        <button className="modal_ingreso_opciones_ingresar" type="submit">{this.state.tipoAccion?"INGRESAR":"REGISTRO"}</button>
                    </div>
                </form>
                :
                <div className={"centrado"}>
                    {!this.state.mostrarConfirmar?
                    <form id="form_registro" validate="true" onSubmit={this.cambiarConfirmacion}>
                        <div className="registroDatos">
                            <div> <span><IconoUsuario fill="#d1d3d8"/></span>
                                <input required id="nombreCompleto" className="inNombresRegistro" placeholder="Nombres"
                                    defaultValue={this.state.nuevoUsuario.nombreCompleto}/>
                            </div>
                            <div> <span><IconoUsuario fill="#d1d3d8"/></span>
                                <input required id="apellidoPaterno" className="inApPatRegistro" placeholder="Apellido Paterno"
                                    defaultValue={this.state.nuevoUsuario.apellidoPaterno}/>
                            </div>
                            <div> <span><IconoUsuario fill="#d1d3d8"/></span>
                                <input required id="apellidoMaterno" className="inApMatRegistro" placeholder="Apellido Materno"
                                    defaultValue={this.state.nuevoUsuario.apellidoMaterno}/>
                            </div>
                            <div> <span><IconoDNIRegistro fill="#d1d3d8"/></span>
                                <input required id="registroNacional" className="inDNIRegistro" placeholder="DNI"
                                    defaultValue={this.state.nuevoUsuario.registroNacional}/>
                            </div>
                            <div> <span><IconoTelefonoRegistro fill="#d1d3d8"/></span>
                                <input required id="telefonoCliente" className="inTelefonoRegistro" placeholder="Telefono"
                                    defaultValue={this.state.nuevoUsuario.telefonoCliente}/>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="centrado">
                            <button className="modal_ingreso_opciones_ingresar" type="submit">REGISTRO</button>
                        </div>
                    </form>
                    :
                    <form id="form_confirmacion" validate="true" onSubmit={this.agregarUsuario}>
                        <div className="registroConfirmacion">
                            <div className="registro_confirmacion">
                                <div>Hola <b>{this.state.nuevoUsuario.nombreCompleto}</b>, Un paso más!</div>
                                <div>Para cambiar tus datos.<span onClick={()=>this.setState({mostrarConfirmar:false})}> Atras</span></div>
                            </div>
                            <div className="registro_confirmacion_cuadro">
                                <span><IconoUsuario fill="#d1d3d8" /></span>
                                <input required id="nombreUsuario" className="inNombreUsuarioConf" placeholder="Email"
                                    defaultValue={this.state.nuevoUsuario.nombreUsuario}/>
                            </div>
                            <div className="registro_confirmacion_cuadro">
                                <span><IconoUsuario fill="#d1d3d8" /></span>
                                <input required id="contrasena" className="inContraseñaConf" placeholder="Contraseña" type="password"/>
                            </div>
                            <div className="registro_confirmacion_cuadro">
                                <span><IconoContrasena fill="#d1d3d8"/></span>
                                <input required id="confirmarContrasena" className="inConfContraseñaConf" placeholder="Confirma Contraseña" type="password"/>
                            </div>
                            <div>
                                <input required type="checkbox" className="terminosRegistro" />
                                <span> Acepto <a href="##" target="_blank">Términos y Condiciones.</a></span>
                            </div>
                            <div>
                                <input type="checkbox" className="UsoInfoRegistro" />
                                <span> Acepto <a href="##" target="_blank">Correos Promocionales.</a> <br /></span>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="centrado">
                            <button className="modal_ingreso_opciones_ingresar" type="submit">CONFIRMAR</button>
                        </div>
                    </form>}
                </div>}

                <div className="modal_ingreso_opciones">
                    <div className="centrado">
                        <button className="modal_ingreso_opciones_salir" onClick={this.props.controlModalIngreso}> SALIR </button>
                    </div>
                </div>
            </div>
        </div> 
        ) } else { return null }
    }
}

export default withRouter(ModalIngreso);