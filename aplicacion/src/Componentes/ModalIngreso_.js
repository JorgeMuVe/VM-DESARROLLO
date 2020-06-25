/****** COMPONENTES ******/
import React from 'react';
import {withRouter} from 'react-router';
import { GoogleLogin } from 'react-google-login';
import { FacebookLogin } from 'react-facebook-login';

import Modal from './Modal';

/***** ICONO SVG *******/
import IconoMercado from '../SVG/IconoMercado';
import IconoUsuario from '../SVG/IconoUsuario';
import IconoContrasena from '../SVG/IconoContrasena';

import IconoFacebook from '../SVG/IconoFacebook';
import IconoTwitter from '../SVG/IconoTwitter';
import IconoGoogle from '../SVG/IconoGoogle';

/****** FUNCIONES *****/
import { ingresarSistema_DB } from '../DB/usuarioDB';

/* VARIABLES GLOBALES */
const estadoInicial = {
    tipoUsuario:'cliente'
};

export class ModalIngreso extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    responseFacebook = (response) => {
        console.log(response);
      }

    responseGoogle = (response) => {
        console.log(response);
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

    render(){
        if(this.props.mostrarModalIngreso){
        return(
            <Modal
                mostrarModal = {this.props.mostrarModalIngreso}
                controlModal = {this.props.controlModalIngreso}
                tituloModal = {"Inicar Sesión"}
            >
            <form className="ModalIngreso" validate="true" onSubmit={this.ingresarSistemaBoton}>
                <div className="modal_ingreso_tipo">
                    <span> Seleccione el tipo de Usuario!</span>
                    <div className="modal_ingreso_tipo_opciones">
                        <div className={this.state.tipoUsuario==='cliente'?"boton_activo":"boton_inactivo"}
                            onClick={()=>this.cambiarTipoUsuario('cliente')}>
                            <IconoUsuario fill="whitesmoke"/><label className="centrado">Cliente</label>
                        </div>
                        <div className={this.state.tipoUsuario==='tienda'?"boton_activo":"boton_inactivo"}
                            onClick={()=>this.cambiarTipoUsuario('tienda')}>
                            <IconoMercado fill="whitesmoke"/><label className="centrado">Tienda</label>
                        </div>
                        <div className={this.state.tipoUsuario==='negocio'?"boton_activo":"boton_inactivo"}
                            onClick={()=>this.cambiarTipoUsuario('negocio')}>
                            <IconoMercado fill="whitesmoke"/><label className="centrado">Negocio</label>
                        </div>
                        <div className={this.state.tipoUsuario==='admin'?"boton_activo":"boton_inactivo"} 
                            onClick={()=>this.cambiarTipoUsuario('admin')}>
                            <IconoMercado fill="whitesmoke"/><label className="centrado">Admin</label>
                        </div>
                    </div>
                </div>
                <div className="modal_ingreo_datos">
                    <div><IconoUsuario fill="#d1d3d8"/><input required id="nombreUsuario" type="text" placeholder="Usuario o Correo"/></div>
                    <div><IconoContrasena fill="#d1d3d8"/><input required id="contrasena" type="password" placeholder="Contraseña"/></div>
                </div>
                <div className="modal_ingreso_opciones">
                    <div> <a href="/recuperar">Olvido su contraseña?</a></div>
                    <div className="centrado"> 
                    <button type="submit"> INGRESAR </button> </div>
                    <div> Nuevo aqui? <a href="/registro">Registrarse</a></div>
                </div>
                <div className="modal_ingreso_internet">
                    <label className="centrado"> INGRESAR CON </label>
                    
                        
                    <FacebookLogin
                        appId="724713238280233"
                        autoLoad
                        callback={this.responseFacebook}
                        render={renderProps => (
                            <button onClick={renderProps.onClick}>This is my custom FB button</button>
                        )}
                    />
                    
                    <div className="ingreso_internet_boton" style={{backgroundColor:'#00aced'}}>
                        <div className="centrado"><IconoTwitter fill="#d1d3d8"/></div>
                        <label>Ingresar con Twitter</label>
                    </div>
                    <GoogleLogin
                        clientId="863857254472-bi855s65oh0llnm47g2n5c1e8e9j37e8.apps.googleusercontent.com"
                        render={renderProps => (
                            <div disabled={renderProps.disabled} onClick={renderProps.onClick} className="ingreso_internet_boton" style={{backgroundColor:'#b63a2b'}}>
                                <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                                <label>Ingresar con Google</label>
                            </div>
                        )}
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </form>
            </Modal>
        ) } else { return null }
    }
}

export default withRouter(ModalIngreso);